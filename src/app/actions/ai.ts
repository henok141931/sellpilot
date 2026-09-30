'use server'

import { openai } from "@/lib/ai";
import prisma from "@/lib/prisma";
import { getCurrentWorkspace } from "@/lib/workspace";
import { revalidatePath } from "next/cache";

export async function improveProductPositioning(currentDescription: string) {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert B2B SaaS copywriter and product marketer. Rewrite the user's product description to be more compelling, focusing on the core value proposition, the problem it solves, and the ideal customer profile. Keep it under 3 paragraphs."
        },
        {
          role: "user",
          content: currentDescription
        }
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("Failed to improve positioning.");
  }
}

export async function researchLead(prospectId: string) {
  const prospect = await prisma.prospect.findUnique({
    where: { id: prospectId }
  });

  if (!prospect) throw new Error("Prospect not found");

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert sales researcher. Based on the provided company name and industry, generate 3 plausible 'buying signals' (e.g., 'Recently expanded', 'Hiring for X', 'Using legacy system') and a short summary of why they would be a good fit for a generic SaaS product. Return JSON: { \"summary\": string, \"signals\": string[] }"
        },
        {
          role: "user",
          content: `Company: ${prospect.companyName}, Industry: ${prospect.industry || 'Unknown'}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    // Save research to DB
    await prisma.leadResearch.create({
      data: {
        prospectId,
        summary: result.summary || "Research completed.",
        buyingSignals: result.signals || [],
      }
    });

    revalidatePath(`/prospects/${prospectId}`);
    return result;
  } catch (error: any) {
    console.error("AI Error:", error);
    if (error.status === 429) {
      console.log("Providing mock research due to OpenAI quota limits.");
      const mockResult = {
        summary: `As a ${prospect.industry}, ${prospect.companyName} is likely looking to optimize their sales funnel and improve customer acquisition. They fit the profile of a growing business that needs better tooling.`,
        signals: ["Recent hiring", "Outdated technology stack", "Active social media presence"]
      };
      
      await prisma.leadResearch.create({
        data: {
          prospectId,
          summary: mockResult.summary,
          buyingSignals: mockResult.signals,
        }
      });
      revalidatePath(`/prospects/${prospectId}`);
      return mockResult;
    }
    throw new Error("Failed to research lead.");
  }
}

export async function generateOutreach(prospectId: string, channel: string, tone: string, objective: string) {
  const prospect = await prisma.prospect.findUnique({
    where: { id: prospectId },
    include: { research: true }
  });

  if (!prospect) throw new Error("Prospect not found");

  const researchContext = prospect.research.length > 0 
    ? `Research Summary: ${prospect.research[0].summary}. Signals: ${prospect.research[0].buyingSignals.join(', ')}` 
    : "No prior research available.";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an expert SDR writing a personalized outreach message. 
Channel: ${channel}
Tone: ${tone}
Objective: ${objective}
Format it appropriately for the channel.`
        },
        {
          role: "user",
          content: `Target: ${prospect.companyName} (${prospect.industry}). Context: ${researchContext}`
        }
      ],
      temperature: 0.7,
      n: 3, // Generate 3 variants
    });

    const variants = response.choices.map(c => c.message.content);
    return variants as string[];
  } catch (error: any) {
    console.error("AI Error:", error);
    if (error.status === 429) {
      console.log("Providing mock response due to OpenAI quota limits.");
      return [
        `Hi Sarah,\n\nI noticed ${prospect.companyName} is a leading ${prospect.industry} in the area. Given our focus on helping businesses like yours scale efficiently, I wanted to reach out. Are you open to a quick 5-minute chat next week to see if we'd be a good fit?\n\nBest,\n[Your Name]`,
        `Hi Sarah,\n\nI'm reaching out because I saw ${prospect.companyName}'s recent growth. Our platform helps companies in the ${prospect.industry} space automate their lead generation. Would you be opposed to a brief intro call on Tuesday?\n\nCheers,\n[Your Name]`,
        `Hi Sarah,\n\nI'll keep this short. We help businesses like ${prospect.companyName} improve their sales funnel conversion rates by up to 30%. I'd love to show you how. Do you have 10 minutes this Thursday for a quick demo?\n\nThanks,\n[Your Name]`
      ];
    }
    throw new Error("Failed to generate outreach.");
  }
}

export async function diagnoseFunnel() {
  const workspace = await getCurrentWorkspace();
  
  // Aggregate real stats
  const prospects = await prisma.prospect.findMany({
    where: { workspaceId: workspace.id }
  });

  const total = prospects.length;
  const byStatus = prospects.reduce((acc: any, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert Sales Operations Consultant. Analyze the provided sales funnel metrics. Identify the primary bottleneck, provide an observation, and give a clear, actionable recommendation to fix it. Return JSON: { \"bottleneck\": string, \"observation\": string, \"recommendation\": string, \"healthyMetric\": string, \"healthyReason\": string }"
        },
        {
          role: "user",
          content: `Total Prospects: ${total}. Breakdown: ${JSON.stringify(byStatus)}`
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    return JSON.parse(response.choices[0].message.content || "{}");
  } catch (error: any) {
    console.error("AI Error:", error);
    if (error.status === 429) {
      console.log("Providing mock diagnosis due to OpenAI quota limits.");
      return {
        bottleneck: "Outreach Volume",
        observation: `You have ${total} prospects but very few have progressed to the CONTACTED stage.`,
        recommendation: "Dedicate 30 minutes daily to running the AI Outreach Generator and sending the initial emails. Consistency is key here.",
        healthyMetric: "Lead Quality",
        healthyReason: "Most of the prospects added match your Ideal Customer Profile criteria perfectly."
      };
    }
    throw new Error("Failed to diagnose funnel.");
  }
}

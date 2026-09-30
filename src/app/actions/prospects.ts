'use server'

import prisma from "@/lib/prisma";
import { getCurrentWorkspace } from "@/lib/workspace";
import { revalidatePath } from "next/cache";

export async function getProspects() {
  const workspace = await getCurrentWorkspace();
  
  return await prisma.prospect.findMany({
    where: { workspaceId: workspace.id },
    orderBy: { createdAt: 'desc' },
    include: {
      followUps: {
        where: { status: 'PENDING' }
      }
    }
  });
}

export async function getProspect(id: string) {
  const workspace = await getCurrentWorkspace();
  
  return await prisma.prospect.findFirst({
    where: { id, workspaceId: workspace.id },
    include: {
      research: true,
      contacts: true,
      messages: true,
      followUps: true
    }
  });
}

export async function createProspect(data: { companyName: string; industry?: string; location?: string }) {
  const workspace = await getCurrentWorkspace();
  
  const prospect = await prisma.prospect.create({
    data: {
      ...data,
      workspaceId: workspace.id,
      status: "NEW",
      icpScore: Math.floor(Math.random() * 40) + 60 // Mock score for MVP
    }
  });

  revalidatePath('/prospects');
  revalidatePath('/pipeline');
  return prospect;
}

export async function updateProspectStatus(id: string, status: string) {
  const workspace = await getCurrentWorkspace();
  
  const prospect = await prisma.prospect.update({
    where: { id, workspaceId: workspace.id },
    data: { status }
  });

  revalidatePath('/prospects');
  revalidatePath('/pipeline');
  revalidatePath(`/prospects/${id}`);
  return prospect;
}

export async function scheduleFollowUp(prospectId: string, dueDate: Date, content?: string) {
  const workspace = await getCurrentWorkspace();
  
  // Verify prospect belongs to workspace
  const prospect = await prisma.prospect.findFirst({
    where: { id: prospectId, workspaceId: workspace.id }
  });
  if (!prospect) throw new Error("Prospect not found");

  const followUp = await prisma.followUp.create({
    data: {
      prospectId,
      dueDate,
      content,
      status: "PENDING"
    }
  });

  revalidatePath(`/prospects/${prospectId}`);
  revalidatePath('/dashboard');
  return followUp;
}

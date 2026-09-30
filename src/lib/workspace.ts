import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getCurrentWorkspace() {
  const supabase = createClient(cookies());
  const { data: { user } } = await supabase.auth.getUser();

  // For MVP/testing: if no user is logged in, just get or create a default workspace
  if (!user) {
    let workspace = await prisma.workspace.findFirst();
    if (!workspace) {
      workspace = await prisma.workspace.create({
        data: {
          name: "Default Workspace",
        }
      });
    }
    return workspace;
  }

  // Ensure user exists in Prisma DB
  await prisma.user.upsert({
    where: { id: user.id },
    update: { email: user.email! },
    create: {
      id: user.id,
      email: user.email!,
      name: user.user_metadata?.full_name || "User",
    }
  });

  // If user is logged in, find their workspace
  const workspaceUser = await prisma.workspaceUser.findFirst({
    where: { userId: user.id },
    include: { workspace: true }
  });

  if (workspaceUser) {
    return workspaceUser.workspace;
  }

  // Create a new workspace for the new user
  const newWorkspace = await prisma.workspace.create({
    data: {
      name: "My Workspace",
      users: {
        create: {
          userId: user.id,
          role: "OWNER"
        }
      }
    }
  });

  return newWorkspace;
}

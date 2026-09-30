'use server'

import prisma from "@/lib/prisma";
import { getCurrentWorkspace } from "@/lib/workspace";
import { revalidatePath } from "next/cache";

export async function getProduct() {
  const workspace = await getCurrentWorkspace();
  
  // For MVP, just get the first product in the workspace, or return a default empty object
  let product = await prisma.product.findFirst({
    where: { workspaceId: workspace.id }
  });

  if (!product) {
    product = await prisma.product.create({
      data: {
        workspaceId: workspace.id,
        name: "",
        website: "",
        description: "",
      }
    });
  }

  return product;
}

export async function updateProduct(id: string, data: { name: string; website: string; description: string; problemSolved: string; market: string; pricing: string }) {
  const workspace = await getCurrentWorkspace();
  
  const product = await prisma.product.update({
    where: { id, workspaceId: workspace.id },
    data
  });

  revalidatePath('/products');
  return product;
}

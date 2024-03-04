"use server";

import { Category, CategoryForCreationEdition } from "../definitions";
import prisma from "../prisma";

export async function getCategories(
  query?: string,
  includeProducts: boolean = false,
) {
  const data = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    where: {
      description: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  const categories: Category[] = data.map((c) => ({
    id: c.id,
    description: c.description,
    total_products: c._count.products,
    products: [],
  }));

  return categories;
}

export async function getCategoryById(id: number) {
  return await prisma.category.findUnique({
    where: {
      id,
    },
  });
}

export async function getAmountOfCategories() {
  return await prisma.category.count();
}

export async function createCategory(
  categoryToCreate: CategoryForCreationEdition,
) {
  return await prisma.category.create({
    data: categoryToCreate,
  });
}

export async function updateCategory(
  categoryToUpdate: CategoryForCreationEdition,
) {
  return await prisma.category.update({
    where: {
      id: categoryToUpdate.id,
    },
    data: categoryToUpdate,
  });
}

export async function deleteCategory(id: number) {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
}

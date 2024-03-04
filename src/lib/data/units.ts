"use server";

import { UnitForCreationEdition } from "../definitions";
import prisma from "../prisma";

export async function getUnits(query?: string) {
  const data = await prisma.unit.findMany({
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

  const units = data.map((c) => ({
    id: c.id,
    description: c.description,
    total_products: c._count.products,
  }));

  return units;
}

export async function getUnitById(id: number) {
  return await prisma.unit.findUnique({
    where: {
      id,
    },
  });
}

export async function getAmountOfUnits() {
  return await prisma.unit.count();
}

export async function createUnit(unitToCreate: UnitForCreationEdition) {
  return await prisma.unit.create({
    data: unitToCreate,
  });
}

export async function updateUnit(unitToUpdate: UnitForCreationEdition) {
  return await prisma.unit.update({
    where: {
      id: unitToUpdate.id,
    },
    data: unitToUpdate,
  });
}

export async function deleteUnit(id: number) {
  return await prisma.unit.delete({
    where: {
      id,
    },
  });
}

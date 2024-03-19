"use server";

import { WorkplaceForCreationEdition } from "../definitions";
import prisma from "../prisma";

export async function getWorkplaces(query?: string) {
  const data = await prisma.workplace.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return data;
}

export async function getWorkplaceById(id: number) {
  return await prisma.workplace.findUnique({
    where: {
      id,
    },
  });
}

export async function getAmountOfUnits() {
  return await prisma.workplace.count();
}

export async function createWorkplace(
  newWorkplace: WorkplaceForCreationEdition,
) {
  return await prisma.workplace.create({
    data: {
      name: newWorkplace.name,
      address: newWorkplace.address,
    },
  });
}

export async function updateWorkplace(
  workplaceUpdated: WorkplaceForCreationEdition,
) {
  return await prisma.workplace.update({
    where: {
      id: workplaceUpdated.id,
    },
    data: workplaceUpdated,
  });
}

export async function deleteWorkplace(id: number) {
  return await prisma.workplace.delete({
    where: {
      id,
    },
  });
}

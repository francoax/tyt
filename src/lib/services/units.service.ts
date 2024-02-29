"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { UnitsSchema } from "../validations";
import { ServerActionResponse } from "../definitions";
import { Prisma } from "@prisma/client";
import { ERROR_STATUS, SUCCESS_STATUS, WARNING_STATUS } from "../constants";
import HandleError from "../errorHandler";

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

export async function deleteUnit(id: number): Promise<ServerActionResponse> {
  try {
    const unitDeleted = await prisma.unit.delete({
      where: {
        id,
      },
    });

    if (!unitDeleted) {
      return {
        message: `No pudo eliminarse el tipo de unidad con el ID ${id}.`,
        status: WARNING_STATUS,
      };
    }
    revalidatePath("/home/units");
    return {
      message: "Tipo de unidad eliminada.",
      status: SUCCESS_STATUS,
    };
  } catch (error) {
    return HandleError(error);
  }
}

const CreateUnit = UnitsSchema.omit({ id: true });
export async function createUnit(
  prevState: ServerActionResponse,
  formData: FormData,
): Promise<ServerActionResponse> {
  const validate = CreateUnit.safeParse({
    description: formData.get("description"),
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Error al crear nuevo tipo de unidad, revise el formulario.",
      status: ERROR_STATUS,
    };
  }

  const { description } = validate.data;
  try {
    await prisma.unit.create({
      data: {
        description,
      },
    });
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath("/home/units");
  return {
    message: "Tipo de unidad creado.",
    status: SUCCESS_STATUS,
  };
}

const UpdateUnit = UnitsSchema;
export async function updateUnit(
  prevState: ServerActionResponse,
  formData: FormData,
): Promise<ServerActionResponse> {
  const validate = UpdateUnit.safeParse({
    id: formData.get("id"),
    description: formData.get("description"),
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Error al intentar actualizar, revise el formulario.",
      status: ERROR_STATUS,
    };
  }

  const unitToUpdate = validate.data;

  try {
    await prisma.unit.update({
      where: {
        id: Number.parseInt(unitToUpdate.id),
      },
      data: {
        description: unitToUpdate.description,
      },
    });
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath("/home/units");
  return {
    message: "Tipo de unidad actualizada.",
    status: SUCCESS_STATUS,
  };
}

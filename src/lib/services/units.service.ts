"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { UnitsSchema } from "../validations";
import { StateForm } from "../definitions";
import { Prisma } from "@prisma/client";

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

export async function deleteUnit(id: number) {
  try {
    const unitDeleted = await prisma.unit.delete({
      where: {
        id,
      },
    });

    if (!unitDeleted) {
      return {
        message: `No pudo eliminarse el tipo de unidad con el ID ${id}.`,
        error: true,
      };
    }
    revalidatePath("/home/units");
    return {
      message: "Tipo de unidad eliminada.",
      error: false,
    };
  } catch (error) {
    return {
      message: "Error al intentar eliminar el tipo de unidad.",
      error: true,
    };
  }
}

const CreateUnit = UnitsSchema.omit({ id: true });
export async function createUnit(prevState: StateForm, formData: FormData) {
  const validate = CreateUnit.safeParse({
    description: formData.get("description"),
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Error al crear nuevo tipo de unidad, revise el formulario.",
      status: false,
    };
  }

  const { description } = validate.data;
  try {
    const unitCreated = await prisma.unit.create({
      data: {
        description,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Ya existe un tipo de unidad con esa descripcion.",
          status: false,
        };
      }
    }
  }

  revalidatePath("/home/units");
  return {
    message: "Tipo de unidad creado.",
    status: true,
  };
}

const UpdateUnit = UnitsSchema;
export async function updateUnit(prevState: StateForm, formData: FormData) {
  const validate = UpdateUnit.safeParse({
    id: formData.get("id"),
    description: formData.get("description"),
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Error al intentar actualizar, revise el formulario.",
      status: false,
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
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Ya existe un tipo de unidad con esa descripcion.",
          status: false,
        };
      }
    }
  }

  revalidatePath("/home/units");
  return {
    message: "Tipo de unidad actualizada.",
    status: true,
  };
}

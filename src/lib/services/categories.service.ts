"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { CategoriesSchema } from "../validations";
import { StateForm } from "../definitions";
import { Prisma } from "@prisma/client";

export async function getCategories(query?: string) {
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

  const categories = data.map((c) => ({
    id: c.id,
    description: c.description,
    total_products: c._count.products,
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

const CreateCategory = CategoriesSchema.omit({ id: true });
export async function createCategory(prevState: StateForm, formData: FormData) {
  const validate = CreateCategory.safeParse({
    description: formData.get("description"),
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Error al crear nueva categoria, revise el formulario.",
      status: false,
    };
  }

  const { description } = validate.data;
  try {
    const categoryCreated = await prisma.category.create({
      data: {
        description,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Ya existe una categoria con esa descripcion.",
          status: false,
        };
      }
    }
  }

  revalidatePath("/home/categories");
  return {
    message: "Categoria creada ",
    status: true,
  };
}

const UpdateCategory = CategoriesSchema;
export async function updateCategory(prevState: StateForm, formData: FormData) {
  const validate = UpdateCategory.safeParse({
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

  const categoryToUpdate = validate.data;

  try {
    await prisma.category.update({
      where: {
        id: Number.parseInt(categoryToUpdate.id),
      },
      data: {
        description: categoryToUpdate.description,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return {
          message: "Ya existe una categoria con esa descripcion.",
          status: false,
        };
      }
    }
  }

  revalidatePath("/home/categories");
  return {
    message: "Categoria actualizada",
    status: true,
  };
}

export async function deleteCategory(id: number) {
  try {
    const categoryDeleted = await prisma.category.delete({
      where: {
        id,
      },
    });

    if (!categoryDeleted) {
      return {
        message: `No pudo eliminarse la categoria con el ID ${id}.`,
        error: true,
      };
    }
    revalidatePath("/home/categories");
    return {
      message: "Categoria eliminada.",
      error: false,
    };
  } catch (error) {
    return {
      message: "Error al intentar eliminar la categoria.",
      error: true,
    };
  }
}

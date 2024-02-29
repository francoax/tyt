"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { CategoriesSchema } from "../validations";
import { ServerActionResponse } from "../definitions";
import HandleError from "../errorHandler";
import { ERROR_STATUS, SUCCESS_STATUS } from "../constants";

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
export async function createCategory(
  prevState: ServerActionResponse,
  formData: FormData,
): Promise<ServerActionResponse> {
  const validate = CreateCategory.safeParse({
    description: formData.get("description"),
  });

  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Error al crear nueva categoria, revise el formulario.",
      status: ERROR_STATUS,
    };
  }

  const { description } = validate.data;
  try {
    await prisma.category.create({
      data: {
        description,
      },
    });
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath("/home/categories");
  return {
    message: "Categoria creada ",
    status: SUCCESS_STATUS,
  };
}

const UpdateCategory = CategoriesSchema;
export async function updateCategory(
  prevState: ServerActionResponse,
  formData: FormData,
): Promise<ServerActionResponse> {
  const validate = UpdateCategory.safeParse({
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
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath("/home/categories");
  return {
    message: "Categoria actualizada",
    status: SUCCESS_STATUS,
  };
}

export async function deleteCategory(
  id: number,
): Promise<ServerActionResponse> {
  try {
    const categoryDeleted = await prisma.category.delete({
      where: {
        id,
      },
    });

    if (!categoryDeleted) {
      return {
        message: `No pudo eliminarse la categoria con el ID ${id}.`,
        status: ERROR_STATUS,
      };
    }
    revalidatePath("/home/categories");
    return {
      message: "Categoria eliminada.",
      status: SUCCESS_STATUS,
    };
  } catch (error) {
    return HandleError(error);
  }
}

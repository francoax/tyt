"use server";

import { revalidatePath } from "next/cache";
import { CategoriesSchema } from "../validations";
import {
  CategoryForCreationEdition,
  ServerActionResponse,
} from "../definitions";
import HandleError from "../errorHandler";
import { CATEGORIES_ROUTE, ERROR_STATUS, SUCCESS_STATUS } from "../constants";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../data/categories";

const CreateCategory = CategoriesSchema.omit({ id: true });
export async function createCategoryAction(
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

  const categoryToCreate = validate.data as CategoryForCreationEdition;
  try {
    await createCategory(categoryToCreate);
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath(CATEGORIES_ROUTE);
  return {
    message: "Categoria creada ",
    status: SUCCESS_STATUS,
  };
}

const UpdateCategory = CategoriesSchema;
export async function updateCategoryAction(
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

  const categoryToUpdate = validate.data as CategoryForCreationEdition;

  try {
    await updateCategory(categoryToUpdate);
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath(CATEGORIES_ROUTE);
  return {
    message: "Categoria actualizada",
    status: SUCCESS_STATUS,
  };
}

export async function deleteCategoryAction(
  id: number,
): Promise<ServerActionResponse> {
  try {
    const categoryDeleted = await deleteCategory(id);

    if (!categoryDeleted) {
      return {
        message: `No pudo eliminarse la categoria con el ID ${id}.`,
        status: ERROR_STATUS,
      };
    }

    revalidatePath(CATEGORIES_ROUTE);
    return {
      message: "Categoria eliminada.",
      status: SUCCESS_STATUS,
    };
  } catch (error) {
    return HandleError(error);
  }
}

"use server";

import { revalidatePath } from "next/cache";
import { ERROR_STATUS, SUCCESS_STATUS, WORKPLACES_ROUTE } from "../constants";
import {
  createWorkplace,
  deleteWorkplace,
  updateWorkplace,
} from "../data/workplace";
import {
  ServerActionResponse,
  WorkplaceForCreationEdition,
} from "../definitions";
import HandleError from "../errorHandler";
import { WorkplaceSchema } from "../validations";

const CreateSchema = WorkplaceSchema.omit({ id: true });

export async function createWorkplaceAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  const validated = CreateSchema.safeParse({
    name: data.get("name"),
    address: data.get("address"),
  });

  if (!validated.success) {
    return {
      message: "Por favor, revise el formulario.",
      status: ERROR_STATUS,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const workplace: WorkplaceForCreationEdition = validated.data;

  try {
    await createWorkplace(workplace);
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath(WORKPLACES_ROUTE);
  return {
    message: "Lugar de trabajo creado.",
    status: SUCCESS_STATUS,
  };
}

export async function updateWorkplaceAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  const validated = WorkplaceSchema.safeParse({
    id: data.get("id"),
    name: data.get("name"),
    address: data.get("address"),
  });

  if (!validated.success) {
    return {
      message: "Por favor, revise el formulario.",
      status: ERROR_STATUS,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const workplace: WorkplaceForCreationEdition = validated.data;

  try {
    await updateWorkplace(workplace);
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath(WORKPLACES_ROUTE);
  return {
    message: "Lugar de trabajo actualizado.",
    status: SUCCESS_STATUS,
  };
}

export async function deleteWorkplaceAction(
  id: number,
): Promise<ServerActionResponse> {
  try {
    await deleteWorkplace(id);
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath(WORKPLACES_ROUTE);
  return {
    message: "Empresa eliminada",
    status: SUCCESS_STATUS,
  };
}

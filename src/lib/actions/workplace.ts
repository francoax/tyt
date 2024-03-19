import { ERROR_STATUS, SUCCESS_STATUS } from "../constants";
import { createWorkplace } from "../data/workplace";
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
    await createWorkplace(workplace);
  } catch (error) {
    return HandleError(error);
  }

  return {
    message: "Lugar de trabajo actualizado.",
    status: SUCCESS_STATUS,
  };
}

export async function deleteWorkplaceAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  return {};
}

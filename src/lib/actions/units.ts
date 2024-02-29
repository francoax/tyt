"use server";

import { revalidatePath } from "next/cache";
import { UnitsSchema } from "../validations";
import { ServerActionResponse, UnitForCreationEdition } from "../definitions";
import { ERROR_STATUS, SUCCESS_STATUS, WARNING_STATUS } from "../constants";
import HandleError from "../errorHandler";
import { createUnit, deleteUnit, updateUnit } from "../data/units";

export async function deleteUnitAction(
  id: number,
): Promise<ServerActionResponse> {
  try {
    const unitDeleted = await deleteUnit(id);

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
export async function createUnitAction(
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

  const unitToCreate = validate.data as UnitForCreationEdition;
  try {
    await createUnit(unitToCreate);
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
export async function updateUnitAction(
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

  const unitToUpdate = validate.data as UnitForCreationEdition;

  try {
    await updateUnit(unitToUpdate);
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath("/home/units");
  return {
    message: "Tipo de unidad actualizada.",
    status: SUCCESS_STATUS,
  };
}

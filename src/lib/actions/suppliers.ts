"use server";

import { revalidatePath } from "next/cache";
import { ERROR_STATUS, SUCCESS_STATUS, SUPPLIERS_ROUTE } from "../constants";
import {
  createSupplier,
  deleteSupplier,
  getSupplierById,
  updateSupplier,
} from "../data/suppliers";
import {
  ServerActionResponse,
  SupplierForCreationEdition,
} from "../definitions";
import HandleError from "../errorHandler";
import { SuppliersSchema } from "../validations";

const CreateSupplier = SuppliersSchema.omit({ id: true });
export async function createSupplierAction(
  prevState: ServerActionResponse,
  newSupplier: FormData,
): Promise<ServerActionResponse> {
  const validate = CreateSupplier.safeParse(
    Object.fromEntries(newSupplier.entries()),
  );

  if (!validate.success) {
    return {
      message: "Por favor, revise el formulario.",
      status: ERROR_STATUS,
      errors: validate.error.flatten().fieldErrors,
    };
  }

  const supplierToCreate = validate.data as SupplierForCreationEdition;

  try {
    await createSupplier(supplierToCreate);
  } catch (error) {
    return HandleError(error);
  }

  revalidatePath(SUPPLIERS_ROUTE);
  return {
    message: "Proveedor creado.",
    status: SUCCESS_STATUS,
  };
}

const UpdateSupplier = SuppliersSchema;
export async function updateSupplierAction(
  prevState: ServerActionResponse,
  supplierUpdated: FormData,
): Promise<ServerActionResponse> {
  const validate = UpdateSupplier.safeParse(
    Object.fromEntries(supplierUpdated.entries()),
  );

  if (!validate.success) {
    return {
      message: "Por favor, revise el formulario",
      status: ERROR_STATUS,
      errors: validate.error.flatten().fieldErrors,
    };
  }

  const supplierToUpdate = validate.data as SupplierForCreationEdition;

  try {
    await updateSupplier(supplierToUpdate);

    revalidatePath(SUPPLIERS_ROUTE);
  } catch (error) {
    return HandleError(error);
  }

  return {
    message: "Proveedor actualizado.",
    status: SUCCESS_STATUS,
  };
}

export async function deleteSupplierAction(
  id: number,
): Promise<ServerActionResponse> {
  return getSupplierById(id)
    .then(async (supp) => {
      if (!supp) {
        return {};
      }

      await deleteSupplier(id);

      revalidatePath(SUPPLIERS_ROUTE);

      return {
        message: "Proveedor eliminado",
        status: SUCCESS_STATUS,
      };
    })
    .catch((error) => HandleError(error));
}

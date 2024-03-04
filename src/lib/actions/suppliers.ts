"use server";

import { revalidatePath } from "next/cache";
import { ERROR_STATUS, SUCCESS_STATUS } from "../constants";
import {
  createSupplier,
  deleteSupplier,
  getSupplierById,
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

  revalidatePath("/home/suppliers");
  return {
    message: "Proveedor creado.",
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

      revalidatePath("/home/suppliers");

      return {
        message: "Proveedor eliminado",
        status: SUCCESS_STATUS,
      };
    })
    .catch((error) => HandleError(error));
}

"use server";

import { revalidatePath } from "next/cache";
import { ERROR_STATUS, SUCCESS_STATUS } from "../constants";
import { createSupplier } from "../data/suppliers";
import {
  ServerActionResponse,
  SupplierForCreationEdition,
} from "../definitions";
import HandleError from "../errorHandler";
import { SuppliersSchema } from "../validations";
import { resolve } from "path";

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

    revalidatePath("/home/suppliers");
  } catch (error) {
    return HandleError(error);
  }

  return {
    message: "Proveedor creado.",
    status: SUCCESS_STATUS,
  };
}

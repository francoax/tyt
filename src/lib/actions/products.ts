"use server";

import { revalidatePath } from "next/cache";
import {
  ProductForCreationEdition,
  ServerActionResponse,
} from "../definitions";
import {
  ERROR_STATUS,
  PRODUCTS_ROUTE,
  SM_WITHDRAW,
  SUCCESS_STATUS,
  WARNING_STATUS,
} from "../constants";
import { ProductsSchema } from "../validations";
import HandleError from "../errorHandler";
import {
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../data/products";
import { validateProductData } from "../utils";

export async function deleteProductAction(id: number) {
  const productToDelete = await getProductById(id, true);

  if (!productToDelete) {
    return {
      message: `No se encontro el producto con el ID ${id}`,
      status: ERROR_STATUS,
    };
  }

  const hasPendingWithdraws = productToDelete.stock_movements.some(
    (s) => s.type_action === SM_WITHDRAW && s.real_amount_used === null,
  );

  if (hasPendingWithdraws) {
    return {
      message: "El producto posee retiros pendientes de confirmacion",
      status: WARNING_STATUS,
    };
  }

  try {
    const productDeleted = await deleteProduct(id);

    if (!productDeleted) {
      return {
        message: `No pudo eliminarse el producto con el ID ${id}.`,
        status: ERROR_STATUS,
      };
    }

    revalidatePath(PRODUCTS_ROUTE);
    return {
      message: "Producto eliminado.",
      status: SUCCESS_STATUS,
    };
  } catch (error) {
    return {
      message: "Error al intentar eliminar el producto.",
      status: ERROR_STATUS,
    };
  }
}

const CreateProduct = ProductsSchema.omit({ id: true });
export async function createProductAction(
  prevState: ServerActionResponse,
  newProduct: FormData,
): Promise<ServerActionResponse> {
  const validated = validateProductData(CreateProduct, newProduct);

  if (!validated.success) {
    return {
      message: "Por favor, revise el formulario",
      errors: validated.error.flatten().fieldErrors,
      status: ERROR_STATUS,
    };
  }

  const productToCreate = validated.data as ProductForCreationEdition;

  try {
    await createProduct(productToCreate);

    revalidatePath(PRODUCTS_ROUTE);
    return {
      message: "Producto creado",
      status: SUCCESS_STATUS,
    };
  } catch (error) {
    return HandleError(error);
  }
}

const UpdateProduct = ProductsSchema;
export async function updateProductAction(
  prevState: ServerActionResponse,
  productUpdated: FormData,
): Promise<ServerActionResponse> {
  const validated = validateProductData(UpdateProduct, productUpdated, true);

  if (!validated.success) {
    return {
      message: "Por favor, revise el formulario",
      status: ERROR_STATUS,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const productToUpdate = validated.data as ProductForCreationEdition;

  try {
    await updateProduct(productToUpdate);

    revalidatePath(PRODUCTS_ROUTE);
  } catch (error) {
    return HandleError(error);
  }

  return {
    message: "Producto actualizado.",
    status: SUCCESS_STATUS,
  };
}

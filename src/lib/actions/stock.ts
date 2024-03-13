import { redirect } from "next/navigation";
import { ERROR_STATUS, SUCCESS_STATUS, WARNING_STATUS } from "../constants";
import { ServerActionResponse, StockDepositForCreation } from "../definitions";
import { StockActionSchema, StockDepositSchema } from "../validations";
import { getProductById, hasPendingWithdraws } from "../data/products";
import { createNewDepositForProduct } from "../data/stock";
import HandleError from "../errorHandler";

export async function initStockDepositAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  const validate = StockActionSchema.safeParse({
    product_id: data.get("product_id"),
  });

  if (!validate.success) {
    return {
      message: "Por favor, seleccione un producto.",
      status: ERROR_STATUS,
      errors: validate.error.flatten().fieldErrors,
    };
  }

  const { product_id } = validate.data;

  redirect(`/home/stock/${product_id}/ingresar`);
}

export async function initStockWithdrawAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  const validate = StockActionSchema.safeParse({
    product_id: data.get("product_id"),
  });

  if (!validate.success) {
    return {
      message: "Por favor, seleccione un producto.",
      status: ERROR_STATUS,
      errors: validate.error.flatten().fieldErrors,
    };
  }

  const { product_id } = validate.data;

  const cantWithdraw = await hasPendingWithdraws(product_id);

  if (cantWithdraw) {
    return {
      message: "El producto tiene un retiro pendiente.",
      status: WARNING_STATUS,
      errors: { product_id: [] },
    };
  }

  const product = await getProductById(product_id);

  if (product?.stock === 0) {
    return {
      message: "El producto no tiene stock para realizar la operacion.",
      status: ERROR_STATUS,
      errors: { product_id: [] },
    };
  }

  redirect(`/home/stock/${product_id}/retirar`);
}

export async function depositSAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  const validated = StockDepositSchema.safeParse(
    Object.fromEntries(data.entries()),
  );

  if (!validated.success) {
    return {
      message: "Por favor, revise el formulario.",
      status: ERROR_STATUS,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const deposit: StockDepositForCreation = validated.data;

  try {
    await createNewDepositForProduct(deposit);
  } catch (error) {
    return HandleError(error);
  }

  return {
    message: "Nuevo stock ingresado.",
    status: SUCCESS_STATUS,
  };
}

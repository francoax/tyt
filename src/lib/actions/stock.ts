"use server";

import { redirect } from "next/navigation";
import {
  ERROR_STATUS,
  PRODUCTS_ROUTE,
  SUCCESS_STATUS,
  WARNING_STATUS,
} from "../constants";
import {
  ServerActionResponse,
  StockDepositForCreation,
  StockWithdrawConfirm,
  StockWithdrawForCreation,
} from "../definitions";
import { StockActionSchema, StockMovementSchema } from "../validations";
import {
  getProductById,
  hasPendingWithdraws,
  updateProductStock,
} from "../data/products";
import {
  confirmWithdrawForProduct,
  createNewDepositForProduct,
  createNewWithdrawForProduct,
} from "../data/stock";
import HandleError from "../errorHandler";
import { revalidatePath } from "next/cache";

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

export async function depositAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  const validated = StockMovementSchema.omit({
    real_amount_used: true,
    movement_id: true,
  }).safeParse(Object.fromEntries(data.entries()));

  if (!validated.success) {
    return {
      message: "Por favor, revise el formulario.",
      status: ERROR_STATUS,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const deposit: StockDepositForCreation = validated.data;

  if (deposit.workplace === 0) {
    deposit.workplace = null;
  }

  if (deposit.supplier_vendor === 0) {
    deposit.supplier_vendor = null;
  }

  try {
    const newDeposit = await createNewDepositForProduct(deposit);

    await updateProductStock(newDeposit.product_id, newDeposit.stock_after!);
  } catch (error) {
    return HandleError(error);
  }

  return {
    message: "Nuevo stock ingresado.",
    status: SUCCESS_STATUS,
  };
}

const WithdrawSchema = StockMovementSchema.omit({
  dollar_at_date: true,
  total_price: true,
  real_amount_used: true,
  movement_id: true,
  budget_number: true,
  supplier_vendor: true,
});
export async function withdrawAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  const validated = WithdrawSchema.safeParse(
    Object.fromEntries(data.entries()),
  );

  if (!validated.success) {
    return {
      message: "Por favor, revise el formulario",
      status: ERROR_STATUS,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const withdraw: StockWithdrawForCreation = validated.data;

  const productInvolved = await getProductById(withdraw.product_id);

  if (withdraw.amount_involved > productInvolved?.stock!) {
    return {
      message: "La cantidad no puede ser mayor al stock actual.",
      status: ERROR_STATUS,
      errors: { amount_involved: [] },
    };
  }

  try {
    const newWithdraw = await createNewWithdrawForProduct(withdraw);

    await updateProductStock(newWithdraw.product_id, newWithdraw.stock_after!);

    revalidatePath(`${PRODUCTS_ROUTE}/${newWithdraw.product_id}/detail`);
  } catch (error) {
    return HandleError(error);
  }

  return {
    message: "Retiro de stock realizado.",
    status: SUCCESS_STATUS,
  };
}

const WithdrawConfirmSchema = StockMovementSchema.omit({
  dollar_at_date: true,
  total_price: true,
});
export async function confirmWithdrawAction(
  prevState: ServerActionResponse,
  data: FormData,
): Promise<ServerActionResponse> {
  const validated = WithdrawConfirmSchema.safeParse(
    Object.fromEntries(data.entries()),
  );

  if (!validated.success) {
    return {
      message: "Por favor, revise el formulario",
      status: ERROR_STATUS,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const confirmedWithdraw: StockWithdrawConfirm = validated.data;

  if (confirmedWithdraw.real_amount_used > confirmedWithdraw.amount_involved) {
    return {
      message: "La cantidad utilizada no puede ser mayor a la retirada.",
      status: ERROR_STATUS,
      errors: { real_amount_used: [] },
    };
  }

  try {
    const confirmedMovement =
      await confirmWithdrawForProduct(confirmedWithdraw);

    await updateProductStock(
      confirmedMovement.product_id,
      confirmedMovement.stock_after!,
    );

    revalidatePath(`${PRODUCTS_ROUTE}/${confirmedMovement.product_id}/detail`);
  } catch (error) {
    return HandleError(error);
  }

  return {
    message: "Retiro confirmado.",
    status: SUCCESS_STATUS,
  };
}

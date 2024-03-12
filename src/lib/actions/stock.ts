import { redirect } from "next/navigation";
import { ERROR_STATUS } from "../constants";
import { ServerActionResponse } from "../definitions";
import { StockActionSchema } from "../validations";

export async function stockDepositAction(
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

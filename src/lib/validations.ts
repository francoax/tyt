import { z } from "zod";

export const CategoriesSchema = z.object({
  id: z.string(),
  description: z
    .string({ required_error: "Por favor, ingrese una descripcion." })
    .min(5, { message: "Debe de contener almenos 5 letras" })
    .toLowerCase(),
});

import { z } from "zod";

const toNumber = z
  .function()
  .args(z.string())
  .returns(z.number())
  .implement((val) => {
    return Number.parseInt(val);
  });

export const CategoriesSchema = z.object({
  id: z.string(),
  description: z
    .string({ required_error: "Por favor, ingrese una descripcion." })
    .min(5, { message: "Debe de contener almenos 5 letras." })
    .toLowerCase(),
});

export const UnitsSchema = z.object({
  id: z.string(),
  description: z
    .string({ required_error: "Por favor, ingrese una descripcion." })
    .min(4, { message: "Debe de contener al menos 4 letras." })
    .toLowerCase(),
});

export const ProductsSchema = z
  .object({
    id: z
      .string()
      .min(1)
      .transform((value) => toNumber(value)),
    name: z
      .string()
      .min(1, { message: "El nombre es requerido." })
      .max(25)
      .regex(RegExp("^[a-zA-Zs]+$"), { message: "El nombre no es valido." }),
    category_id: z
      .string()
      .min(1, { message: "La categoria es requerida." })
      .transform((value) => toNumber(value)),
    unit_id: z
      .string()
      .min(1, { message: "El tipo de unidad es requerido." })
      .transform((value) => toNumber(value)),
    suppliers: z.number().array(),
  })
  .required();

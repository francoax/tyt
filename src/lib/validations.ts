import { z } from "zod";

const toNumber = z
  .function()
  .args(z.string())
  .returns(z.number())
  .implement((val) => {
    return Number(val);
  });

const toUndefined = z
  .function()
  .args(z.string())
  .returns(z.string().or(z.undefined()))
  .implement((val) => {
    return val === "" ? undefined : val;
  });

export const CategoriesSchema = z
  .object({
    id: z
      .string()
      .min(1)
      .transform((value) => toNumber(value)),
    description: z
      .string({ required_error: "Por favor, ingrese una descripcion." })
      .min(1, { message: "La descripcion es requerida." })
      .min(4, { message: "Debe de contener almenos 4 letras." })
      .regex(RegExp("^[a-zA-Zs ]+$"), {
        message: "La descripcion no es valida.",
      })
      .toLowerCase(),
  })
  .required();

export const UnitsSchema = z
  .object({
    id: z
      .string()
      .min(1)
      .transform((value) => toNumber(value)),
    description: z
      .string({ required_error: "Por favor, ingrese una descripcion." })
      .min(4, { message: "Debe de contener al menos 4 letras." })
      .regex(RegExp("^[a-zA-Zs ]+$"), {
        message: "La descripcion no es valida.",
      })
      .toLowerCase(),
  })
  .required();

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
      .regex(RegExp(`^[a-zA-Z-Z0-9s ]+$`), {
        message: "El nombre no es valido.",
      }),
    category_id: z
      .string()
      .min(1, { message: "La categoria es requerida." })
      .transform((value) => toNumber(value)),
    unit_id: z
      .string()
      .min(1, { message: "El tipo de unidad es requerido." })
      .transform((value) => toNumber(value)),
    suppliers: z.array(
      z.object({ id: z.number().nullish(), name: z.string().nullish() }),
    ),
  })
  .required();

export const SuppliersSchema = z.object({
  id: z
    .string()
    .min(1)
    .transform((value) => toNumber(value)),
  name: z
    .string()
    .min(1, { message: "El nombre es requerido." })
    .regex(RegExp("^[a-zA-Zs ]+$"), {
      message: "La descripcion no es valida.",
    })
    .toLowerCase(),
  email: z
    .string()
    .email({ message: "El mail no es valido." })
    .transform((val) => toUndefined(val))
    .optional()
    .or(z.literal("")),
  tel: z.string().max(11, { message: "El telefono no es valido." }).optional(),
  address: z
    .string()
    .transform((val) => toUndefined(val))
    .optional()
    .or(z.literal("")),
});

export const StockActionSchema = z.object({
  product_id: z
    .string()
    .min(1, { message: "El producto es requerido." })
    .transform((value) => toNumber(value)),
});

export const StockMovementSchema = z
  .object({
    product_id: z
      .string()
      .min(1)
      .regex(RegExp(`^[0-9]+$`), { message: "Solo numeros." })
      .transform((value) => toNumber(value)),
    movement_id: z
      .string()
      .transform((value) => toNumber(value))
      .nullish(),
    amount_involved: z
      .string()
      .min(1, { message: "La cantidad es requerida." })
      .regex(RegExp(`^[0-9]+$`), { message: "Solo numeros." })
      .transform((value) => toNumber(value)),
    real_amount_used: z
      .string()
      .min(1, { message: "La cantidad es requerida." })
      .regex(RegExp(`^[0-9]+$`), { message: "Solo numeros." })
      .transform((value) => toNumber(value)),
    dollar_at_date: z
      .string()
      .min(1, { message: "El dolar es requerido." })
      .regex(RegExp(`^[0-9]+$`), { message: "Solo numeros." })
      .transform((value) => toNumber(value)),
    total_price: z
      .string()
      .min(1, { message: "El total es requerido." })
      .regex(RegExp(`^[0-9]+$`), { message: "Solo numeros." })
      .transform((value) => toNumber(value)),
    stock_before: z
      .string()
      .min(1)
      .regex(RegExp(`^[0-9]+$`))
      .transform((value) => toNumber(value)),
    stock_after: z
      .string()
      .min(1)
      // .regex(RegExp(`^-?\d+$`))
      .transform((value) => toNumber(value)),
    budget_id: z.string(),
    description: z.string(),
    supplier_vendor: z
      .string()
      .transform((value) => toNumber(value))
      .optional(),
    workplace: z
      .string()
      .transform((value) => toNumber(value))
      .optional(),
  })
  .required();

export const SignInSchema = z.object({
  username: z.string().min(1, { message: "Username es requerido." }),
  password: z.string().min(1, { message: "Contraseña es requerida." }),
});

export const WorkplaceSchema = z.object({
  id: z
    .string()
    .min(1)
    .transform((value) => toNumber(value)),
  name: z.string().min(1, { message: "El nombre es requerido." }),
  address: z.string().nullable(),
});

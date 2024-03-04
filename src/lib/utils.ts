import bcrypt from "bcrypt";
import { z } from "zod";

const saltRounds = 10;

export async function hashPassword(plainPass: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(plainPass, saltRounds);
    return hashedPassword;
  } catch (e) {
    console.log("Error hashing password -> ", e);
    throw e;
  }
}

export async function comparePasswords(
  entry: string,
  real: string,
): Promise<boolean> {
  try {
    const comparedPasswords = await bcrypt.compare(entry, real);
    return comparedPasswords;
  } catch (e) {
    console.log("Error comparing password ->", e);
    throw e;
  }
}

export function formatSuppliers(product: FormData) {
  let suppliersFormatted: { id?: number; name?: string }[] = [];
  const suppliersFormData = product.getAll("suppliers");

  if (suppliersFormData.at(0) !== "") {
    suppliersFormatted = suppliersFormData.map((s) => ({
      id: Number.parseInt(s.toString()) || 0,
      name: s.toString() || "",
    }));
  }

  return suppliersFormatted;
}

export function validateProductData<T extends z.ZodTypeAny>(
  schemaValidator: T,
  product: FormData,
  includeId: boolean = false,
) {
  type obj = {
    [key: string]: string | undefined | { id?: number; name?: string }[];
  };

  let object: obj = {
    name: product.get("name")?.toString(),
    category_id: product.get("category_id")?.toString(),
    unit_id: product.get("unit_id")?.toString(),
    suppliers: formatSuppliers(product),
  };

  if (includeId) {
    object["id"] = product.get("id")?.toString();
  }
  return schemaValidator.safeParse(object);
}

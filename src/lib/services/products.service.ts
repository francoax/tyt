"use server";

import { revalidatePath } from "next/cache";
import {
  ProductDataForCreationEdition,
  ProductForCreation,
  ProductTableFormatted,
  ServerActionResponse,
} from "../definitions";
import prisma from "../prisma";
import {
  ERROR_STATUS,
  SM_WITHDRAW,
  SUCCESS_STATUS,
  WARNING_STATUS,
} from "../constants";
import { getCategories } from "./categories.service";
import { getUnits } from "./units.service";
import { ProductsSchema } from "../validations";
import HandleError from "../errorHandler";

export async function getProducts(query?: string) {
  const data = await prisma.product.findMany({
    include: {
      category: true,
      unit: true,
      suppliers: {
        include: {
          supplier: true,
        },
      },
    },
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  const formattedData: ProductTableFormatted[] = data.map((p) => {
    return {
      id: p.id,
      name: p.name,
      category: p.category.description,
      unit: p.unit.description,
      suppliers: p.suppliers.map((s) => s.supplier.name),
    };
  });

  return formattedData;
}

export async function getProductById(
  id: number,
  includeStockMovements: boolean = false,
) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      stock_movements: includeStockMovements,
      category: true,
      unit: true,
      suppliers: {
        include: {
          supplier: true,
        },
      },
    },
  });
}

export async function getAmountOfProducts() {
  return await prisma.product.count();
}

export async function deleteProduct(id: number) {
  const productToDelete = await getProductById(id);

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
    const productDeleted = await prisma.product.delete({
      where: {
        id,
      },
    });

    if (!productDeleted) {
      return {
        message: `No pudo eliminarse el producto con el ID ${id}.`,
        status: ERROR_STATUS,
      };
    }

    revalidatePath("/home/products");
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

export async function initCreationEdition() {
  //const suppliers = getSuppliers()
  let dataForCreation: ProductDataForCreationEdition;

  try {
    const [categories, units] = await Promise.all([
      getCategories(),
      getUnits(),
    ]);

    dataForCreation = {
      categories: categories.map((c) => ({
        value: c.id.toString(),
        label: c.description,
      })),
      units: units.map((u) => ({
        value: u.id.toString(),
        label: u.description,
      })),
      suppliers: [],
    };

    return dataForCreation;
  } catch (error) {
    console.log(error);
  }
}

const CreateProduct = ProductsSchema.omit({ id: true });
export async function createProduct(
  prevState: ServerActionResponse,
  newProduct: FormData,
): Promise<ServerActionResponse> {
  let suppliersFormatted: number[] = [];
  const suppliersFormData = newProduct.getAll("suppliers");

  if (suppliersFormData.at(0) !== "") {
    suppliersFormatted = suppliersFormData.map((s) =>
      Number.parseInt(s.toString()),
    );
  }

  const validate = CreateProduct.safeParse({
    name: newProduct.get("name"),
    category_id: newProduct.get("category_id"),
    unit_id: newProduct.get("unit_id"),
    suppliers: suppliersFormatted,
  });

  if (!validate.success) {
    return {
      message: "Por favor, revise el formulario",
      errors: validate.error.flatten().fieldErrors,
      status: ERROR_STATUS,
    };
  }

  const productToCreate = validate.data as ProductForCreation;

  try {
    await prisma.product.create({
      data: {
        name: productToCreate.name,
        category_id: productToCreate.category_id,
        unit_id: productToCreate.unit_id,
        // suppliers: {
        //   create: productToCreate.suppliers.map(s => ({ supplier_id: s }))
        // }
      },
    });

    revalidatePath("/home/products");
    return {
      message: "Producto creado",
      status: SUCCESS_STATUS,
    };
  } catch (error) {
    return HandleError(error);
  }
}

const UpdateProduct = ProductsSchema;
export async function updateProduct(
  prevState: ServerActionResponse,
  productUpdated: FormData,
): Promise<ServerActionResponse> {
  return {
    message: "done",
    status: SUCCESS_STATUS,
  };
}

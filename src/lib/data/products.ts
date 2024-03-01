"use server";

import {
  ProductDataForCreationEdition,
  ProductForCreationEdition,
  ProductTableFormatted,
} from "../definitions";
import HandleError from "../errorHandler";
import prisma from "../prisma";
import { getCategories } from "./categories";
import { getUnits } from "./units";
import { unstable_noStore as noStore } from "next/cache";

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

export async function createProduct(
  productToCreate: ProductForCreationEdition,
) {
  return await prisma.product.create({
    data: {
      name: productToCreate.name,
      category_id: productToCreate.category_id,
      unit_id: productToCreate.unit_id,
      // suppliers: {
      //   create: productToCreate.suppliers.map(s => ({ supplier_id: s }))
      // }
    },
  });
}

// export async function updateProduct(productToUpdate: ProductForCreationEdition) {
//   return await prisma.product.update({
//     where: {
//       id: productToUpdate.id
//     },
//     data: productToUpdate
//   })
// }

export async function deleteProduct(id: number) {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
}

export async function initCreationEdition() {
  //const suppliers = getSuppliers()
  noStore();
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
    return HandleError(error);
  }
}

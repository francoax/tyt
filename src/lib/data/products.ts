"use server";

import { SM_WITHDRAW } from "../constants";
import {
  ProductDataForCreationEdition,
  ProductForCreationEdition,
  ProductTableFormatted,
} from "../definitions";
import HandleError from "../errorHandler";
import prisma from "../prisma";
import { getCategories } from "./categories";
import { getSuppliers } from "./suppliers";
import { getUnits } from "./units";
import { unstable_noStore as noStore } from "next/cache";

export async function getProducts(query?: {
  name?: string;
  description?: string;
}) {
  const data = await prisma.product.findMany({
    include: {
      category: true,
      unit: true,
      suppliers: true,
    },
    where: {
      AND: [
        {
          name: {
            contains: query?.name,
            mode: "insensitive",
          },
        },
        {
          category: {
            description: {
              contains: query?.description,
            },
          },
        },
      ],
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
      suppliers: p.suppliers.map((s) => s.name),
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
      stock_movements: includeStockMovements
        ? { orderBy: { date_action: "desc" } }
        : false,
      category: true,
      unit: true,
      suppliers: true,
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
      suppliers: {
        connectOrCreate: productToCreate.suppliers?.map((s) => ({
          where: {
            id: s.id!,
          },
          create: { name: s.name! },
        })),
      },
    },
  });
}

export async function updateProduct(
  productToUpdate: ProductForCreationEdition,
) {
  return await prisma.product.update({
    where: {
      id: productToUpdate.id,
    },
    data: {
      category_id: productToUpdate.category_id,
      unit_id: productToUpdate.unit_id,
      name: productToUpdate.name,
      suppliers: {
        set: productToUpdate.suppliers?.map((s) => ({ id: s.id })),
      },
    },
  });
}

export async function deleteProduct(id: number) {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
}

export async function initCreationEdition() {
  noStore();
  let dataForCreation: ProductDataForCreationEdition;

  try {
    const [categories, units, suppliers] = await Promise.all([
      getCategories(),
      getUnits(),
      getSuppliers(),
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
      suppliers: suppliers.map((s) => ({
        value: s.id.toString(),
        label: s.name,
      })),
    };

    return dataForCreation;
  } catch (error) {
    return HandleError(error);
  }
}

export async function getProductsForStockAction() {
  return prisma.product.findMany({
    select: {
      id: true,
      name: true,
      stock: true,
      unit: {
        select: {
          description: true,
        },
      },
    },
  });
}

export async function hasPendingWithdraws(id: number) {
  return await prisma.stockMovement.count({
    where: {
      AND: [
        {
          product_id: id,
          type_action: SM_WITHDRAW,
          real_amount_used: null,
        },
      ],
    },
  });
}

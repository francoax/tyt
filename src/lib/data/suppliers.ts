import { SupplierForCreationEdition } from "../definitions";
import prisma from "../prisma";

export async function getSuppliers(
  query?: string,
  includeProducts: boolean = false,
) {
  return await prisma.supplier.findMany({
    where: {
      name: query,
    },
    include: {
      products: includeProducts,
    },
  });
}

export async function getAmountOfSuppliers() {
  return await prisma.supplier.count();
}

export async function createSupplier(
  supplierToCreate: SupplierForCreationEdition,
) {
  return await prisma.supplier.create({
    data: supplierToCreate,
  });
}

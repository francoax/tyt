import { SupplierForCreationEdition } from "../definitions";
import prisma from "../prisma";

export async function getSuppliers(
  query?: string,
  includeProducts: boolean = false,
) {
  return await prisma.supplier.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      products: includeProducts,
    },
    orderBy: {
      id: "asc",
    },
  });
}

export async function getSupplierById(
  id: number,
  includeProducts: boolean = false,
) {
  return await prisma.supplier.findFirstOrThrow({
    where: {
      id,
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

export async function updateSupplier(
  supplierToUpdate: SupplierForCreationEdition,
) {
  return await prisma.supplier.update({
    where: {
      id: supplierToUpdate.id,
    },
    data: supplierToUpdate,
  });
}

export async function deleteSupplier(id: number) {
  return await prisma.supplier.delete({
    where: {
      id,
    },
  });
}

"use server";

import { unstable_noStore as noStore } from "next/cache";
import {
  StockDataFormatted,
  StockDepositForCreation,
  StockWithdrawConfirm,
  StockWithdrawForCreation,
} from "../definitions";
import prisma from "../prisma";
import { hasPendingWithdraws } from "./products";
import { ITEMS_PER_PAGE, SM_DEPOSIT, SM_WITHDRAW } from "../constants";
import { addHours } from "date-fns";

export async function getDataForStockTable() {
  noStore();
  try {
    const latestMovements = await prisma.stockMovement.groupBy({
      by: ["product_id", "type_action"],
      _max: {
        date_action: true,
      },
    });

    const indexedMovementPerProduct = latestMovements.reduce(
      (
        acc: {
          [key: number]: { type_action: string; date_action: Date | undefined };
        },
        current,
      ) => {
        acc[current.product_id] = {
          date_action: current._max.date_action ?? undefined,
          type_action: current.type_action,
        };
        return acc;
      },
      {},
    );

    const products = await prisma.product.findMany({
      select: {
        id: true,
        unit: {
          select: {
            description: true,
          },
        },
        name: true,
        stock: true,
      },
    });

    const dataTable: StockDataFormatted[] = products.map((p) => {
      return {
        product_id: p.id,
        product_name: p.name,
        actual_stock: `${p.stock} ${p.unit.description}`,
        last_movement: indexedMovementPerProduct[p.id]?.date_action,
        type_action: indexedMovementPerProduct[p.id]?.type_action,
      };
    });

    for (const sm of dataTable) {
      const status = await hasPendingWithdraws(sm.product_id);
      sm.hasPendingWithdraws = !!status;
    }

    return dataTable;
  } catch (error) {
    return [];
  }
}

export async function getAmountOfPendingWithdraws() {
  return await prisma.stockMovement.count({
    where: {
      AND: [
        {
          real_amount_used: null,
          type_action: SM_WITHDRAW,
        },
      ],
    },
  });
}

export async function getAmountOfMovementsByProduct(
  product_id: number,
  dates: { from: string; to: string },
) {
  noStore();
  const fromDate = new Date(dates.from);
  const toDate = new Date(dates.to);

  const amount = await prisma.stockMovement.count({
    where: {
      AND: [
        {
          product_id,
        },
        {
          date_action: {
            gte: fromDate,
            lte: toDate,
          },
        },
      ],
    },
  });

  return Math.ceil(amount / ITEMS_PER_PAGE);
}

export async function createNewDepositForProduct(
  newDeposit: StockDepositForCreation,
) {
  return await prisma.stockMovement.create({
    data: {
      product_id: newDeposit.product_id,
      total_price: newDeposit.total_price,
      dollar_at_date: newDeposit.dollar_at_date,
      stock_after: newDeposit.stock_after,
      stock_before: newDeposit.stock_before,
      amount_involved: newDeposit.amount_involved,
      budget_id: newDeposit.budget_id,
      description: newDeposit.description,
      supplier_id: newDeposit.supplier_vendor,
      workplace_id: newDeposit.workplace,
      type_action: SM_DEPOSIT,
    },
  });
}

export async function createNewWithdrawForProduct(
  newWithdraw: StockWithdrawForCreation,
) {
  return await prisma.stockMovement.create({
    data: {
      product_id: newWithdraw.product_id,
      amount_involved: newWithdraw.amount_involved,
      stock_before: newWithdraw.stock_before,
      stock_after: newWithdraw.stock_after,
      description: newWithdraw.description,
      workplace_id: newWithdraw.workplace,
      type_action: SM_WITHDRAW,
    },
  });
}

export async function getStockMovementById(movementId: number) {
  return await prisma.stockMovement.findFirst({
    where: {
      id: movementId,
    },
    include: {
      product: {
        include: {
          unit: true,
        },
      },
    },
  });
}

export async function confirmWithdrawForProduct(
  movement: StockWithdrawConfirm,
) {
  return await prisma.stockMovement.update({
    where: {
      id_product_id: {
        id: movement.movement_id!,
        product_id: movement.product_id,
      },
    },
    data: {
      real_amount_used: movement.real_amount_used,
      stock_after: movement.stock_after,
      date_confirmed: movement.date_confirmed,
      // description: movement.description,
    },
  });
}

export async function getMovementsForProduct(
  product_id: number,
  currentPage: number,
  dates: { from: string; to: string },
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  const fromDate = new Date(dates.from);
  const toDate = addHours(new Date(dates.to), 46.99);

  return await prisma.stockMovement.findMany({
    where: {
      AND: [
        {
          product_id,
        },
        {
          date_action: {
            gte: fromDate.toISOString(),
            lte: toDate.toISOString(),
          },
        },
      ],
    },
    include: {
      supplier: true,
      workplace: true,
    },
    orderBy: { date_action: "desc" },
    take: ITEMS_PER_PAGE,
    skip: offset,
  });
}

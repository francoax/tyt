"use server";

import { unstable_noStore as noStore } from "next/cache";
import { StockDataFormatted, StockDepositForCreation } from "../definitions";
import prisma from "../prisma";
import { hasPendingWithdraws } from "./products";
import { SM_DEPOSIT, SM_WITHDRAW } from "../constants";

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
      type_action: SM_DEPOSIT,
    },
  });
}
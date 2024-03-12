"use server";

import { unstable_noStore as noStore } from "next/cache";
import { StockDataFormatted } from "../definitions";
import prisma from "../prisma";
import { hasPendingWithdraws } from "./products";

export async function getDataForStockTable() {
  noStore();
  try {
    const latestMovements = await prisma.stockMovement.groupBy({
      by: ["product_id"],
      _max: {
        date_action: true,
      },
    });

    const indexedMovementPerProduct = latestMovements.reduce(
      (acc: { [key: number]: Date | null }, current) => {
        acc[current.product_id] = current._max.date_action;
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
        last_movement: indexedMovementPerProduct[p.id],
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

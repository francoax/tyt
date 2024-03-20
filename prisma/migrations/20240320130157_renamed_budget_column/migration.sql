/*
  Warnings:

  - You are about to drop the column `budget_number` on the `stock_movements` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stock_movements" DROP COLUMN "budget_number",
ADD COLUMN     "budget_id" TEXT;

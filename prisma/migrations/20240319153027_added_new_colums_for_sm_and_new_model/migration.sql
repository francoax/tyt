/*
  Warnings:

  - You are about to alter the column `total_price` on the `stock_movements` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "stock_movements" ADD COLUMN     "budget_number" INTEGER,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "supplier_id" INTEGER,
ADD COLUMN     "workplace_id" INTEGER,
ALTER COLUMN "total_price" SET DATA TYPE INTEGER;

-- CreateTable
CREATE TABLE "workplaces" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "workplaces_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "workplaces_name_key" ON "workplaces"("name");

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_workplace_id_fkey" FOREIGN KEY ("workplace_id") REFERENCES "workplaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

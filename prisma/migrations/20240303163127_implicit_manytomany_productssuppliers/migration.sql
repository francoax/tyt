/*
  Warnings:

  - You are about to drop the `products_suppliers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stockmovements` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "products_suppliers" DROP CONSTRAINT "products_suppliers_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products_suppliers" DROP CONSTRAINT "products_suppliers_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "stockmovements" DROP CONSTRAINT "stockmovements_product_id_fkey";

-- DropTable
DROP TABLE "products_suppliers";

-- DropTable
DROP TABLE "stockmovements";

-- CreateTable
CREATE TABLE "stock_movements" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "date_action" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type_action" "ActionTypes" NOT NULL,
    "amount_involved" INTEGER,
    "real_amount_used" INTEGER,
    "dollar_at_date" INTEGER,
    "total_price" INTEGER,
    "stock_before" INTEGER,
    "stock_after" INTEGER,

    CONSTRAINT "stock_movements_pkey" PRIMARY KEY ("id","product_id")
);

-- CreateTable
CREATE TABLE "_ProductToSupplier" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToSupplier_AB_unique" ON "_ProductToSupplier"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToSupplier_B_index" ON "_ProductToSupplier"("B");

-- AddForeignKey
ALTER TABLE "stock_movements" ADD CONSTRAINT "stock_movements_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSupplier" ADD CONSTRAINT "_ProductToSupplier_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToSupplier" ADD CONSTRAINT "_ProductToSupplier_B_fkey" FOREIGN KEY ("B") REFERENCES "suppliers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

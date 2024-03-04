/*
  Warnings:

  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `unitId` on the `products` table. All the data in the column will be lost.
  - The primary key for the `stockmovements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amountInvolved` on the `stockmovements` table. All the data in the column will be lost.
  - You are about to drop the column `dateAction` on the `stockmovements` table. All the data in the column will be lost.
  - You are about to drop the column `dollarAtDate` on the `stockmovements` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `stockmovements` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `stockmovements` table. All the data in the column will be lost.
  - You are about to drop the column `typeAction` on the `stockmovements` table. All the data in the column will be lost.
  - You are about to drop the `ProductsPerSuppliers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `amount_involved` to the `stockmovements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_action` to the `stockmovements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dollar_at_date` to the `stockmovements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `stockmovements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `stockmovements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_action` to the `stockmovements` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductsPerSuppliers" DROP CONSTRAINT "ProductsPerSuppliers_productId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsPerSuppliers" DROP CONSTRAINT "ProductsPerSuppliers_supplierId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_unitId_fkey";

-- DropForeignKey
ALTER TABLE "stockmovements" DROP CONSTRAINT "stockmovements_productId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "categoryId",
DROP COLUMN "unitId",
ADD COLUMN     "category_id" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "unit_id" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "stockmovements" DROP CONSTRAINT "stockmovements_pkey",
DROP COLUMN "amountInvolved",
DROP COLUMN "dateAction",
DROP COLUMN "dollarAtDate",
DROP COLUMN "productId",
DROP COLUMN "totalPrice",
DROP COLUMN "typeAction",
ADD COLUMN     "amount_involved" INTEGER NOT NULL,
ADD COLUMN     "date_action" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dollar_at_date" INTEGER NOT NULL,
ADD COLUMN     "product_id" INTEGER NOT NULL,
ADD COLUMN     "total_price" INTEGER NOT NULL,
ADD COLUMN     "type_action" "ActionTypes" NOT NULL,
ADD CONSTRAINT "stockmovements_pkey" PRIMARY KEY ("product_id");

-- DropTable
DROP TABLE "ProductsPerSuppliers";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(30) NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_suppliers" (
    "product_id" INTEGER NOT NULL,
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "products_suppliers_pkey" PRIMARY KEY ("product_id","supplier_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "units"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stockmovements" ADD CONSTRAINT "stockmovements_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_suppliers" ADD CONSTRAINT "products_suppliers_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_suppliers" ADD CONSTRAINT "products_suppliers_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

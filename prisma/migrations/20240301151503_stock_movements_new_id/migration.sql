/*
  Warnings:

  - The primary key for the `stockmovements` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `stockmovements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stockmovements" DROP CONSTRAINT "stockmovements_pkey",
ADD COLUMN     "id" INTEGER NOT NULL,
ADD CONSTRAINT "stockmovements_pkey" PRIMARY KEY ("id", "product_id");

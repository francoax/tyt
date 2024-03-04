/*
  Warnings:

  - Added the required column `real_amount_used` to the `stockmovements` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stockmovements" ADD COLUMN     "real_amount_used" INTEGER NOT NULL;

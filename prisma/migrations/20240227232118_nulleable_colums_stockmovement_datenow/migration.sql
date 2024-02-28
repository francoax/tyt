-- AlterTable
ALTER TABLE "stockmovements" ALTER COLUMN "amount_involved" DROP NOT NULL,
ALTER COLUMN "date_action" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "dollar_at_date" DROP NOT NULL,
ALTER COLUMN "total_price" DROP NOT NULL,
ALTER COLUMN "real_amount_used" DROP NOT NULL;

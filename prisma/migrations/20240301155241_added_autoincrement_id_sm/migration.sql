-- AlterTable
CREATE SEQUENCE stockmovements_id_seq;
ALTER TABLE "stockmovements" ALTER COLUMN "id" SET DEFAULT nextval('stockmovements_id_seq');
ALTER SEQUENCE stockmovements_id_seq OWNED BY "stockmovements"."id";

-- DropIndex
DROP INDEX "Interest_name_key";

-- AlterTable
ALTER TABLE "Interest" ADD COLUMN     "email" TEXT,
ALTER COLUMN "phoneNumber" DROP NOT NULL;

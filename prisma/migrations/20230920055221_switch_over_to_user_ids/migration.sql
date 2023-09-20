/*
  Warnings:

  - You are about to drop the column `ownerEmail` on the `Project` table. All the data in the column will be lost.
  - Added the required column `ownerId` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "ownerEmail",
ADD COLUMN     "ownerId" TEXT NOT NULL;

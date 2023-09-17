/*
  Warnings:

  - You are about to drop the column `grade` on the `Interest` table. All the data in the column will be lost.
  - You are about to drop the column `skillLevel` on the `Interest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interest" DROP COLUMN "grade",
DROP COLUMN "skillLevel",
ADD COLUMN     "interestInMeeting" BOOLEAN NOT NULL DEFAULT false;

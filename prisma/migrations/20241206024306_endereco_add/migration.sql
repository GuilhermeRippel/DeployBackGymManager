/*
  Warnings:

  - You are about to drop the column `enreco` on the `Gym` table. All the data in the column will be lost.
  - Added the required column `endereco` to the `Gym` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Gym" DROP COLUMN "enreco",
ADD COLUMN     "endereco" TEXT NOT NULL;

/*
  Warnings:

  - The primary key for the `Gym` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Gym" DROP CONSTRAINT "Gym_pkey",
ALTER COLUMN "cnpj" SET DATA TYPE TEXT,
ADD CONSTRAINT "Gym_pkey" PRIMARY KEY ("cnpj");

/*
  Warnings:

  - Added the required column `avatar` to the `Aparelho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aparelho" ADD COLUMN     "avatar" TEXT NOT NULL;

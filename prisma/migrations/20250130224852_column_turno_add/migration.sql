/*
  Warnings:

  - Added the required column `turno` to the `Aluno` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Aluno" ADD COLUMN     "turno" TEXT NOT NULL;

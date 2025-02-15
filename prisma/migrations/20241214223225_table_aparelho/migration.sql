-- CreateTable
CREATE TABLE "Aparelho" (
    "id" SERIAL NOT NULL,
    "nomeAparelho" TEXT NOT NULL,
    "statusAparelho" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "gymCnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Aparelho_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Aparelho" ADD CONSTRAINT "Aparelho_gymCnpj_fkey" FOREIGN KEY ("gymCnpj") REFERENCES "Gym"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

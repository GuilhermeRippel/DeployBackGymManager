-- CreateTable
CREATE TABLE "Funcionario" (
    "id" SERIAL NOT NULL,
    "nomeFuncionario" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "gymCnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_gymCnpj_fkey" FOREIGN KEY ("gymCnpj") REFERENCES "Gym"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

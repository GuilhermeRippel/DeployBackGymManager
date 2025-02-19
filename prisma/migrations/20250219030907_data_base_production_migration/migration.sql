-- CreateTable
CREATE TABLE "Gym" (
    "cnpj" TEXT NOT NULL,
    "nomeAcad" TEXT NOT NULL,
    "nomeResp" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "capacidadeMax" TEXT,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "password" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("cnpj")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nomeAluno" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "gymCnpj" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aparelho" (
    "id" SERIAL NOT NULL,
    "nomeAparelho" TEXT NOT NULL,
    "statusAparelho" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "gymCnpj" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Aparelho_pkey" PRIMARY KEY ("id")
);

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
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_gymCnpj_fkey" FOREIGN KEY ("gymCnpj") REFERENCES "Gym"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aparelho" ADD CONSTRAINT "Aparelho_gymCnpj_fkey" FOREIGN KEY ("gymCnpj") REFERENCES "Gym"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Funcionario" ADD CONSTRAINT "Funcionario_gymCnpj_fkey" FOREIGN KEY ("gymCnpj") REFERENCES "Gym"("cnpj") ON DELETE RESTRICT ON UPDATE CASCADE;

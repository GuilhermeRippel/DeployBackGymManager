-- CreateTable
CREATE TABLE "Gym" (
    "cnpj" INTEGER NOT NULL,
    "nomeAcad" TEXT NOT NULL,
    "nomeResp" TEXT NOT NULL,
    "telefone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "enreco" TEXT NOT NULL,
    "capacidadeMax" INTEGER,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("cnpj")
);

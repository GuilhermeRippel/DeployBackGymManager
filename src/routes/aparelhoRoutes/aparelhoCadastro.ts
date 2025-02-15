import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import upload from "../../middlewares/multerConfig";

const Router = express.Router();
const prisma = new PrismaClient();

interface CustomRequest extends Request {
  gym?: { cnpj: string };
}


Router.post("/Cadastro", upload.single("avatar"), async (req: CustomRequest, res: Response) => {
  const { nomeAparelho, statusAparelho, fabricante } = req.body;
  
  // Verifica se a imagem foi enviada corretamente
  if (!req.file) {
     res.status(400).json({ message: "Nenhuma imagem foi enviada!" });
     return
  }

  const avatar = `/uploads/${req.file.filename}`


  if (!nomeAparelho?.trim() || !statusAparelho?.trim() || !fabricante?.trim()) {
     res.status(400).json({ message: "Dados faltantes!" });
     return
  }

  if (!req.gym) {
     res.status(400).json({ message: "CNPJ inválido!" });
     return
  }

  try {
    const response = await prisma.aparelho.create({
      data: {
        nomeAparelho,
        statusAparelho,
        fabricante,
        avatar,
        gymCnpj: req.gym.cnpj,
      },
    });
    res.status(201).json({ message: "Aparelho cadastrado!", response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno no servidor" });
  }
});

export default Router;

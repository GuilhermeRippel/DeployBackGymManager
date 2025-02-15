import express, { Request, Response } from "express";
import {PrismaClient} from "@prisma/client"

interface CustomRequest extends Request {
    gym?: { cnpj: string }
}

const router = express.Router();
const prisma = new PrismaClient()

router.get("/gymProfileData", async (req: CustomRequest, res: Response) => {
    try {
        const cnpj = req.gym?.cnpj
        if (!cnpj) {
            res.status(400).json({ message: "CNPJ não fornecido" });
            return 
        }

        const profileData = await prisma.gym.findUnique({
            where: { cnpj }
        });

        if (!profileData) {
            res.status(404).json({ message: "Academia não encontrada" });
            return 
        }

        

        res.status(200).json(profileData);
        return 
    } catch (error) {
        console.error("Erro ao buscar dados do perfil da academia:", error);
        res.status(500).json({ message: "Erro interno no servidor" });
    }
});

export default router;

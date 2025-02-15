import express, {Request, Response} from "express";
import { PrismaClient } from "@prisma/client";
import upload from "../../middlewares/multerConfig";

const Router = express.Router();
const prisma = new PrismaClient();

interface CustomRequest extends Request {
    file?: Express.Multer.File;
    body: {
      nomeAparelho: string;
      fabricante: string;
      statusAparelho: string;
    };
  }

Router.put("/Atualizar/:id", upload.single("avatar"), async (req: CustomRequest, res: Response) => {
    const  id  = Number(req.params.id);
    const {nomeAparelho, fabricante, statusAparelho} = req.body;

    if (!req.file) {
        res.status(400).json({ message: "Nenhuma imagem foi enviada!" });
        return
     }

     const avatar = `/uploads/${(req.file as Express.Multer.File).filename}`

    try {
        const existingEquipament = await prisma.aparelho.findUnique({
            where: { id: id },
        });

        if (!existingEquipament) {
            res.status(404).json({ message: "Aparelho não encontrado" });
            return 
        }

        const updatedEquipament = await prisma.aparelho.update({
            where: { id: Number(id) },
            data: {
                nomeAparelho,
                fabricante,
                statusAparelho,
                avatar,
            },
        });

        res.json({ message: "Aparelho atualizado com sucesso!", updatedEquipament });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar aparelho" });
    }
});

export default Router;
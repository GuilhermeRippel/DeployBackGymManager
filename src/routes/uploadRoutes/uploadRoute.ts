import express, { Request, Response } from "express";
import upload from "../../middlewares/multerConfig";

const Router = express.Router();

Router.post("/", upload.single("image"), (req: Request, res: Response) => {
  try {
    if (!req.file) {
    res.status(400).json({ error: "Nenhuma imagem foi enviada!" });
      return 
    }

    res.status(200).json({
      message: "Upload realizado com sucesso!",
      imageUrl: `/uploads/${req.file.filename}`,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer upload da imagem!" });
  }
});

export default Router;

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface CustomRequest extends Request {
    gym?: { cnpj: string }
}

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error("Erro no token de autenticação");
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(403).json({ message: "Acesso negado" });
        return
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET) as { cnpj: string };
        req.gym = {cnpj: decoded.cnpj}
        next()
    } catch (err) {
        res.status(500).json({ message: "Token inválido", error: err });
        return
    }
};

export default auth;

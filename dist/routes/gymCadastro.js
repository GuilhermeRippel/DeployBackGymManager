"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const Router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
Router.post('/gymCadastro', async (req, res) => {
    const { nomeAcademia, cnpj, email, password, confirmPassword, nomeResp, endereco, telefone } = req.body;
    if (!nomeAcademia || !cnpj || !email || !password || !confirmPassword || !nomeResp || !endereco || !telefone) {
        res.status(400).json({ message: `Faltam informações pra concluir o cadastro` });
        return;
    }
    try {
        const createUser = prisma.gym.create({
            data: {
                cnpj: cnpj,
                nomeAcad: nomeAcademia,
                email: email,
                telefone: telefone,
                password: password,
                nomeResp: nomeResp,
                endereco: endereco
            }
        });
        res.status(201).json(createUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: `Erro ao cadastrar usuário`, err });
    }
});
exports.default = Router;
/*
{
  "nomeAcademia":"academia exemplo",
  "cnpj":"123456789",
  "nomeResp":"exemplo",
  "email":"exemplo@gmail.com",
  "telefone":"99999999999",
  "endereco":"exemplo de endereço",
  "password":"exemplo123",
  "confirmPassword":"exemplo123",
}
*/ 

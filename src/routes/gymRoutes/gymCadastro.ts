import express, {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'
import bcrypt from 'bcrypt'

const Router = express.Router()
const prisma = new PrismaClient()

interface Academia {
    nomeAcademia: string
    cnpj: string
    email: string
    password: string
    confirmPassword: string
    nomeResp: string
    endereco: string
    telefone: string
    capacidadeMax: string
}

Router.post('/gymCadastro', async (req: Request, res: Response) => {
    const {
        nomeAcademia, cnpj, email, password, confirmPassword,
        nomeResp, endereco, telefone, capacidadeMax
    }: Academia = req.body;

    if (!nomeAcademia || !cnpj || !email || !password || !confirmPassword || !nomeResp || !endereco || !telefone) {
        res.status(400).json({ message: 'Faltam informações para concluir o cadastro' });
        return;
    }

    if(password != confirmPassword){
        res.status(400).json({message: `As senhas não coincidem`})
        return
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try {
        console.log('Dados recebidos:', req.body);

        const createUser = await prisma.gym.create({
            data: {
                cnpj: cnpj,
                nomeAcad: nomeAcademia,
                email: email,
                telefone: telefone,
                password: hashedPassword,
                nomeResp: nomeResp,
                endereco: endereco,
                capacidadeMax: capacidadeMax,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        });

        res.status(201).json(createUser);
    } catch (err) {
        console.error('Erro ao cadastrar usuário:', err);
        res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err });
    }
});


export default Router


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
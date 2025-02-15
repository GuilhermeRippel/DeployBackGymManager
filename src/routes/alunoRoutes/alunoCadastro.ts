import { PrismaClient } from '@prisma/client';
import express, {Request, Response} from 'express'

const Router = express.Router()
const prisma = new PrismaClient()

interface CustomRequest extends Request{
    gym?: {cnpj: string}
}

interface aluno {
    nomeAluno: string
    idade: string
    email: string
    telefone: string
    cpf: string
    turno: string
}

Router.post('/Cadastro', async (req: CustomRequest, res: Response) => {
    const {nomeAluno, idade, email, telefone, cpf, turno}: aluno = req.body
    
    if(!req.gym){
        res.status(400).json({message: `CNPJ vazio`})
        return
    }

    try{
        const response = await prisma.aluno.create({
            data: {
                nomeAluno: nomeAluno,
                idade: idade,
                email: email,
                telefone: telefone,
                cpf: cpf,
                turno: turno,
                gymCnpj: req.gym.cnpj
            }
        })

        res.status(201).json({message: `Usuário cadastrado`, response})
    }
    catch(err){
        res.status(500).json({message: `Erro interno no servidor`, err})
    }
})

export default Router
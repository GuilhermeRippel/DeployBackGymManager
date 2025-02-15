import express, {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'

const Router = express.Router()
const prisma = new PrismaClient()

interface CustomRequest extends Request{
    gym?: {cnpj: string}
}

Router.get("/Data", async (req: CustomRequest, res: Response) => {
    if(!req.gym){
        res.status(400).json({message: `CNPJ vazio`})
        return
    }

    try{
        const consultaAlunos = await prisma.aluno.findMany({
            where: {
                gymCnpj: req.gym.cnpj
            }
        })
        res.status(200).json({consultaAlunos})
    }
    catch(err){
        res.status(500).json({message: `Erro interno do servidor`})
    }
})

Router.get("/DataManha", async (req: CustomRequest, res: Response) => {
    if(!req.gym){
        res.status(400).json({message: `CNPJ vazio`})
        return
    }

    try{
        const consultaAlunos = await prisma.aluno.findMany({
            where: {
                turno: 'Manhã',
                gymCnpj: req.gym.cnpj
            }
        })
        res.status(200).json({consultaAlunos})
    }
    catch(err){
        res.status(500).json({message: `Erro interno do servidor`})
    }
})


Router.get("/DataNoite", async (req: CustomRequest, res: Response) => {
    if(!req.gym){
        res.status(400).json({message: `CNPJ vazio`})
        return
    }

    try{
        const consultaAlunos = await prisma.aluno.findMany({
            where: {
                turno: 'Noite',
                gymCnpj: req.gym.cnpj
            }
        })
        res.status(200).json({consultaAlunos})
    }
    catch(err){
        res.status(500).json({message: `Erro interno do servidor`})
    }
})

export default Router
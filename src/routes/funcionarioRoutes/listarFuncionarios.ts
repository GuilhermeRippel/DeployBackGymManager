import express, {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

interface CustomRequest extends Request{
    gym?: {cnpj: string}
}

const Router = express.Router()
const prisma = new PrismaClient()

Router.get("/Listar", async (req: CustomRequest, res: Response) => {
    if(!req.gym){
        res.status(401).json({message: `Token inválido`})
        return
    }
        try {
            const response = await prisma.funcionario.findMany({
                where:{
                    gymCnpj: req.gym.cnpj
                }
            })
            res.status(200).json({response})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: `Erro interno do servidor`})
        }
})

Router.get("/ListarNoite", async (req: CustomRequest, res: Response) => {
    if(!req.gym){
        res.status(401).json({message: `Token inválido`})
        return
    }
        try {
            const response = await prisma.funcionario.findMany({
                where:{
                    turno: "Noite",
                    gymCnpj: req.gym.cnpj
                }
            })
            res.status(200).json({response})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: `Erro interno do servidor`})
        }
})

Router.get("/ListarManha", async (req: CustomRequest, res: Response) => {
    if(!req.gym){
        res.status(401).json({message: `Token inválido`})
        return
    }
        try {
            const response = await prisma.funcionario.findMany({
                where:{
                    turno: "Manhã",
                    gymCnpj: req.gym.cnpj
                }
            })
            res.status(200).json({response})
        } catch (error) {
            console.log(error)
            res.status(500).json({message: `Erro interno do servidor`})
        }
})

export default Router
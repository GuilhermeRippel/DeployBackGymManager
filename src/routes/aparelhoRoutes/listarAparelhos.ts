import express, {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

const Router = express.Router()
const prisma = new PrismaClient()

interface CustomRequest extends Request {
    gym?: {cnpj: string}
}

Router.get("/Listar", async (req: CustomRequest, res:Response) => {
    if(!req.gym){
        res.status(401).json({message: `CNPJ inválido`})
       return 
    }

    try{
        const getAparelhos = await prisma.aparelho.findMany({
            where: {
                gymCnpj: req.gym.cnpj
            }
        })

        res.status(200).json({getAparelhos})
    }
    catch(err){
        res.status(500).json({message: `Erro interno do servidor`, err})
    }
})

Router.get("/ListarManutencao", async (req: CustomRequest, res:Response) => {
    if(!req.gym){
        res.status(404).json({message: `CNPJ inválido`})
       return 
    }

    try{
        const getAparelhos = await prisma.aparelho.findMany({
            where: {
                gymCnpj: req.gym.cnpj,
                statusAparelho: "Manutenção"
            }
        })

        res.status(200).json({getAparelhos})
    }
    catch(err){
        res.status(500).json({message: `Erro interno do servidor`, err})
    }
})

Router.get("/ListarFuncional", async (req: CustomRequest, res:Response) => {
    if(!req.gym){
        res.status(404).json({message: `CNPJ inválido`})
       return 
    }

    try{
        const getAparelhos = await prisma.aparelho.findMany({
            where: {
                gymCnpj: req.gym.cnpj,
                statusAparelho: "Funcional"
            }
        })

        res.status(200).json({getAparelhos})
    }
    catch(err){
        res.status(500).json({message: `Erro interno do servidor`, err})
    }
})

export default Router
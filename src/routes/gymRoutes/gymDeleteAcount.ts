import express, {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'

const Router = express.Router()
const prisma = new PrismaClient()

interface CustomRequest extends Request {
    gym?: {cnpj: string}
}

Router.delete("/Deletar", async (req: CustomRequest, res: Response) => {
    const {cnpj} = req.body

    if(!req.gym){
        res.status(400).json({message: 'CNPJ inválido'})
        return
    }

    try {
        const findGym = await prisma.gym.findUnique({
            where: {cnpj: cnpj}
        })

        if(!findGym){
            res.status(404).json({message: 'CNPJ inválido'})
            return
        }

        await prisma.gym.delete({
            where: {cnpj: cnpj}
        })

        res.status(200).json({message: 'Conta deletada'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor'})
    }
})

export default Router
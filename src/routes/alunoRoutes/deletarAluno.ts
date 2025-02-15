import express, {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'

const Router = express.Router()
const prisma = new PrismaClient()

Router.delete('/Delete/:id', async (req: Request, res:Response) => {
    const id = parseInt(req.params.id)
    

    try{
        const userDelete = await prisma.aluno.findUnique({
            where: {
                id: id,
            }
        })

        if(!userDelete){
            res.status(404).json({message: `Usuário não encontrado`})
            return
        }

        await prisma.aluno.delete({
            where: {
                id: id,
            }
        })

        res.status(200).json({message: `Usuário deletado`, userDelete})
    }
    catch(err){
        res.status(500).json({message: `Erro interno do servidor`})
    }
})

export default Router
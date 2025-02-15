import express, {Request, Response} from 'express'
import { PrismaClient } from '@prisma/client'

const Router = express.Router()
const prisma = new PrismaClient()

Router.delete("/Delete/:id", async (req:Request, res: Response)=> {
    const id = Number(req.params.id)

    if(!id){
        res.status(400).json({message: `Id vazio/inválido`})
        return
    }

    try{
        const findAparelho = await prisma.aparelho.delete({
            where: {
                id: id,
            }
        })

        res.status(200).json({message: `Usuário deletado`, findAparelho})
    }
    catch(err){

    }
})

export default Router
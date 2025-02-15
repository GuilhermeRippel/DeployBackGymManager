import express, {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

const Router = express.Router()
const prisma = new PrismaClient()

Router.get("/All", async (req: Request, res: Response) => {
    try{
        const response = await prisma.gym.findMany()

        res.status(200).json({response})
    } catch(err){
        res.status(500).json({message: `Erro interno do servidor`})
    }
})

export default Router
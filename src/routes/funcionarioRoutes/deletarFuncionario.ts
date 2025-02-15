import express, {Request, Response} from 'express'
import {PrismaClient} from '@prisma/client'

const Router = express.Router()
const prisma = new PrismaClient()

interface CustomRequest extends Request{ 
    gym?: {cnpj: string}
}

Router.delete("/Deletar/:id", async (req: CustomRequest, res: Response) => {
    const id = Number(req.params.id)
    
    if(!req.gym){
        res.status(401).json({message: `Token inválido`})
        return
    }

    const deleteFuncionario = await prisma.funcionario.delete({
        where: {
            id: id,
            gymCnpj:  req.gym.cnpj
        }
    })

    res.status(200).json({message: `Funcionário deletado ${deleteFuncionario}`})
})

export default Router
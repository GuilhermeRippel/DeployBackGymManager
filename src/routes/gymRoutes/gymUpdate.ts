import { PrismaClient } from '@prisma/client';
import express, {Request, Response} from 'express'

const Router = express.Router()
const prisma = new PrismaClient()

interface CustomRequest extends Request {
    gymCnpj?: {cnpj: string}
}

Router.put("/Atualizar/:cnpj", async (req: CustomRequest, res: Response) => {
    const cnpj = req.params.cnpj
    const {gymCnpj, nomeAcad, email, nomeResp, endereco, telefone, capacidadeMax} = req.body

    if(!cnpj){
        res.status(400).json({message: "Precisa estar autenticado"})
        return
    }

    try {
        const response = await prisma.gym.update({
            where: {cnpj: cnpj},
            data: {
                cnpj: gymCnpj,
                nomeAcad: nomeAcad,
                email: email,
                nomeResp: nomeResp,
                endereco: endereco,
                telefone: telefone,
                capacidadeMax: capacidadeMax
            }
        })

        res.status(200).json({message: "Perfil atualizado com sucesso", response})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'Erro interno do servidor'})
    }
})

export default Router
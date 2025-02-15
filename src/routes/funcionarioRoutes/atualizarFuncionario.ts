import { PrismaClient } from '@prisma/client';
import express, {Request, Response} from 'express'

const Router = express.Router()
const prisma = new PrismaClient()

interface CustomRequest extends Request {
    gym?: { cnpj: string };
}

Router.put("/Atualizar/:id", async (req: CustomRequest, res: Response) => {
    const id = Number(req.params.id)
    const {nomeFuncionario, funcao, turno} = req.body

    if(!id || !nomeFuncionario.trim() || !funcao.trim() || !turno.trim()){
        res.status(400).json({message: "Dados faltantes"})
        return
    }

    try {
        const findFuncionario = await prisma.funcionario.findUnique({
            where: {id: id}
        })

        if(!findFuncionario){
            res.status(404).json({message: "Funcionário não encontrado"})
            return
        } 

        const updateFuncionario = await prisma.funcionario.update({
            where: {id: id},
            data: {
                nomeFuncionario,
                funcao,
                turno,
                gymCnpj: req.gym?.cnpj
            }
        })

        res.status(200).json({message: "Atualizado com sucesso!", updateFuncionario})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Erro interno do servidor"})
    }
})

export default Router
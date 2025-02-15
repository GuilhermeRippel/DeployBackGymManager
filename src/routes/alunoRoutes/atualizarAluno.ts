import { PrismaClient } from '@prisma/client';
import express, {Request, Response} from 'express'

const Router = express.Router()
const prisma = new PrismaClient()

interface CustomRequest extends Request{
    gym?: {cnpj: string}
}

Router.put("/Atualizar/:id", async (req: CustomRequest, res: Response) => {
    
    const id = Number(req.params.id)
    const {nomeAluno, cpf, idade, telefone, turno, email} = req.body

    if(!req.gym){
        res.status(400).json({message: "CNPJ Vazio"})
        return
    }

    try {
        const findAluno = await prisma.aluno.findUnique({
            where:{id: id}
        })

        if(!findAluno){
            res.status(404).json({message: "Aluno não existe/não encontrado"})
            return
        }

        await prisma.aluno.update({
            where:{id: id},
            data:{
                nomeAluno,
                cpf,
                idade,
                telefone,
                email,
                turno,
                gymCnpj: req.gym.cnpj
            }
        })

        res.status(200).json({ message: "Aluno atualizado com sucesso!" });
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Erro interno no servidor"})
    }
})

export default Router
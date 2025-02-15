import express, {Request, Response} from 'express'
import { PrismaClient} from '@prisma/client'

const Router = express.Router()
const prisma = new PrismaClient()

interface CustomRequest extends Request{
    gym?: {cnpj: string}
}

interface Funcionario {
    nomeFuncionario: string
    turno: string
    funcao: string
}

Router.post("/cadastro", async (req: CustomRequest, res: Response) => {
    const {nomeFuncionario, turno, funcao}: Funcionario = req.body

    if(!req.gym){
        res.status(400).json({message: `CNPJ vazio`})
        return
    }

    try {
        const response = await prisma.funcionario.create({
            data: {
                nomeFuncionario: nomeFuncionario,
                turno: turno,
                funcao: funcao,
                gymCnpj: req.gym.cnpj
            }
        })

        res.status(201).json({message: `Funcionário criado: ${response}`})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: `Erro interno no servidor`})
    }
})

export default Router
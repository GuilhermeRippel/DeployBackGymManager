import express, { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const Router = express.Router()
const prisma = new PrismaClient()

interface CustomRequest extends Request {
    gym?: { cnpj: string }
}

Router.post('/VerifyPassword', async (req: CustomRequest, res: Response) => {
    const { password } = req.body

    try {
        const findGym = await prisma.gym.findUnique({
            where: {
                cnpj: req.gym?.cnpj
            }
        })

        if (!findGym) {
           res.status(404).json({ message: 'Academia não encontrada' })
           return 
        }

        const passwordCompare = await bcrypt.compare(password, findGym.password)

        if (!passwordCompare) {
            res.status(400).json({ message: 'Senha incorreta' })
            return
        }

        res.status(200).json({ message: 'Senha verificada com sucesso' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
})

Router.put('/Update', async (req: CustomRequest, res:Response) => {
    const {password} = req.body
    if(!password){
        res.status(404).json({message: 'Não foi encontrada uma senha válida'})
        return
    }

    if (!req.gym?.cnpj) {
         res.status(400).json({ message: 'CNPJ não fornecido' })
         return
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const tryChangePassword = await prisma.gym.update({
            where: {cnpj: req.gym?.cnpj},
            data: {password: hashedPassword}
        })

        console.log(tryChangePassword)
        res.status(200).json({message: 'Senha atualizada com sucesso'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Erro interno do servidor' })
    }
})

export default Router

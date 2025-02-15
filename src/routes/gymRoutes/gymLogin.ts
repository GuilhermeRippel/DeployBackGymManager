import { PrismaClient } from '@prisma/client';
import express, {Request, Response} from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Router = express.Router()
const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET

if(!JWT_SECRET){
    throw new Error("Erro no token de autenticação")
}

Router.post('/Login', async (req: Request, res:Response) => {
    const gymLogin = req.body

    if(!gymLogin.cnpj || !gymLogin.email || !gymLogin.password){
        res.status(400).json({message: `Dados faltantes`})
        return
    }

    try{
        const userCheck = await prisma.gym.findFirst({
            where: {
                AND: [
                    { cnpj: gymLogin.cnpj },
                    { email: gymLogin.email }
                ]
            }
        });

        if(!userCheck){
            res.status(401).json({message: `Usuário não encontrado`})
            return
        }

        const gymPasswordCompare = await bcrypt.compare(gymLogin.password, userCheck.password)

        if(!gymPasswordCompare){
            res.status(400).json({message: `Senha incorreta`})
        }

        const token = jwt.sign({cnpj: userCheck.cnpj}, JWT_SECRET, {expiresIn: '5h'})
        res.status(200).json({token})
    }
    catch(err){
        res.status(500).json({message: `Erro no servidor`, err})
    }
})

export default Router
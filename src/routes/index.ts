import gymCadastro from './gymRoutes/gymCadastro'
import gymProfileData from './gymRoutes/gymProfileData'
import gymLogin from './gymRoutes/gymLogin'
import gymUpdate from './gymRoutes/gymUpdate'
import gymDeleteAcount from './gymRoutes/gymDeleteAcount'
import gymUpdatePassword from './gymRoutes/gymUpdatePassword'
import alunoCadastro from './alunoRoutes/alunoCadastro'
import alunosData from './alunoRoutes/alunosData'
import deletarAluno from './alunoRoutes/deletarAluno'
import atualizarAluno from './alunoRoutes/atualizarAluno'
import aparelhoCadastro from './aparelhoRoutes/aparelhoCadastro'
import listarAparelho from './aparelhoRoutes/listarAparelhos'
import deletarAparelho from './aparelhoRoutes/deletarAparelho'
import atualizarAparelho from './aparelhoRoutes/atualizarAparelho'
import cadastroFuncionario from './funcionarioRoutes/cadastroFuncionario'
import listarFuncionario from './funcionarioRoutes/listarFuncionarios'
import deletarFuncionario from './funcionarioRoutes/deletarFuncionario'
import atualizarFuncionario from './funcionarioRoutes/atualizarFuncionario'
import uploadRoutes from "../routes/uploadRoutes/uploadRoute"
import showAllGym from './gymRoutes/showAllGym'
import express from 'express'
import auth from '../middlewares/auth'

const RouterAplication = express.Router()

RouterAplication.use("/gym", gymCadastro)
RouterAplication.use("/gymLogin", gymLogin)
RouterAplication.use("/gymProfile", auth, gymProfileData)
RouterAplication.use("/gymUpdate", auth, gymUpdate)
RouterAplication.use("/gymDelete", auth, gymDeleteAcount)
RouterAplication.use("/gymUpdatePassword", auth, gymUpdatePassword)

RouterAplication.use("/alunoCadastro", auth, alunoCadastro)
RouterAplication.use("/alunosData", auth, alunosData)
RouterAplication.use("/alunoDelete", auth, deletarAluno)
RouterAplication.use("/atualizarAluno", auth, atualizarAluno)

RouterAplication.use("/aparelhoCadastro", auth, aparelhoCadastro)
RouterAplication.use("/listarAparelho", auth, listarAparelho)
RouterAplication.use("/deletarAparelho", auth, deletarAparelho)
RouterAplication.use("/atualizarAparelho", auth, atualizarAparelho)

RouterAplication.use("/cadastroFuncionario", auth, cadastroFuncionario)
RouterAplication.use("/listarFuncionario", auth, listarFuncionario)
RouterAplication.use("/deletarFuncionario", auth, deletarFuncionario)
RouterAplication.use("/atualizarFuncionario", auth, atualizarFuncionario)

RouterAplication.use("/upload", auth, uploadRoutes)

RouterAplication.use("/ShowAll", showAllGym)

export default RouterAplication
import express from 'express'
import cors from 'cors'
import RouterAplication from './routes'
import bodyParser from 'body-parser'
import dotenv from "dotenv";

dotenv.config();
const app = express()
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"));


app.use(RouterAplication)

const PORT = 3002
app.listen(PORT, () => console.log(`Rodando o express na porta ${PORT}`))
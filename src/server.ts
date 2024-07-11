import express from "express"
import router from "./router"
import cors, { CorsOptions } from 'cors'
import morgan from "morgan"
import db from "./config/db"
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, {swaggerUiOptions} from "./config/swagger"

//conectar a db
export const conectDB = async () => {
     try {
          await db.authenticate()
          db.sync()
          // console.log('coneccion exitosa');
     } catch (error) {
          console.log(error);
          console.log('error a la coneccion');
          
     }
}

conectDB()

//instancia de express
const server = express()

//permitir conexiones
const corsOptions: CorsOptions = {
     origin: (origin, callback) => {
          if (origin === process.env.FROTEND_URL) {
               callback(null, true)
          } else {
               callback(new Error('Error de CORS'))
          }
     }
}
server.use(cors(corsOptions))

//leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

//DOCS
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUiOptions))

export default server
import express from 'express'
import dotenv from 'dotenv'
import { conectDB } from './src/config/db'
import taskRoutes from './src/routes/taskRoutes'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './src/config/swagger'
import cors from 'cors'
import { corsConfig } from './src/config/cors'


dotenv.config()
conectDB()
const server = express()

server.use(express.json())
server.use(cors(corsConfig))

server.use('/api/', taskRoutes )

// Docs Swagger
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

export default server
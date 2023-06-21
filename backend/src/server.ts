require('dotenv').config()
import './module-alias'
import * as cors from 'cors'
import * as morgan from 'morgan'
import * as express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../openapi.json'
import { config } from './config'
import { AppDataSource } from '@src/data-source'
import handleRequest from '@utils/handleRequest'
import { ApplicationRoutes } from '@routes/index'
import errorMiddleware from '@middlewares/errorMiddleware'
import { generateAccounts } from '@src/scripts/generateAccounts'

const startServer = async () => {
  const { serverPort } = config

  const app = express()
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost'],
    }),
  )
  app.use(express.json())
  app.use(morgan('tiny'))

  await AppDataSource.initialize()
  await generateAccounts(AppDataSource)

  for (const route of ApplicationRoutes) {
    await handleRequest(app, route)
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.use(errorMiddleware)
  app.listen(serverPort, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${serverPort}`)
  })
}

startServer().catch((error) => console.log(error))

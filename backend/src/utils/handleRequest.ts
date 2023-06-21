import { Request, Response, NextFunction, Application } from 'express'
import { Route } from '@app-types'

const handleRequest = async (app: Application, route: Route) => {
  const { method, path, controller, action } = route

  const handleRequestMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const controllerInstance = new controller()
      const result = await controllerInstance[action](req, res, next)

      if (!result) {
        return
      }

      if (typeof result === 'string') {
        res.status(200).send(result)
      }

      if (result.errorCode) {
        next({
          statusCode: result.errorCode,
          message: result.message,
        })
      }

      if (result) {
        res.status(result.statusCode).send(result.data)
      }
    } catch (err) {
      next(err)
    }
  }

  await app[method](path, handleRequestMiddleware)
}

export default handleRequest

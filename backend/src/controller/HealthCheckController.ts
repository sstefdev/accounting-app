import { NextFunction, Request, Response } from 'express'
import { ControllerType, ErrorType, ResponseType } from '@app-types'

export class HealthCheckController implements ControllerType<ResponseType<string> | ErrorType> {
  async check(_req: Request, _res: Response, next: NextFunction): Promise<string> {
    try {
      return 'OK'
    } catch (err) {
      next(err)
    }
  }
}

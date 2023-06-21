/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'

const errorMiddleware = (err: any, _req: Request, res: Response, next: NextFunction) => {
  let statusCode = err.statusCode
  if (statusCode === 200) {
    return
  }

  if (statusCode === undefined) {
    statusCode = 500
  }

  res.status(statusCode).json({
    error: {
      statusCode,
      message: err.message,
    },
  })
}

export default errorMiddleware

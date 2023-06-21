import { NextFunction, Request, Response } from 'express'
import { Account } from '@entity/index'
import { AccountType, ControllerType, ErrorType, ResponseType } from '@app-types'
import { AppDataSource } from '@src/data-source'

export class AccountController implements ControllerType<ResponseType<AccountType> | ErrorType> {
  private accountRepository = AppDataSource.getRepository(Account)

  async create(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ResponseType<AccountType> | ErrorType> {
    try {
      const account = this.accountRepository.create()
      await this.accountRepository.save(account)
      return {
        data: account,
        statusCode: 201,
      }
    } catch (error) {
      next(error)
    }
  }

  async one(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<ResponseType<AccountType> | ErrorType> {
    try {
      const { id: account_id } = req.params
      if (!account_id || typeof account_id !== 'string') {
        return {
          errorCode: 404,
          message: 'Missing account_id',
        }
      }

      const account = await this.accountRepository.findOne({
        where: { account_id },
        relations: ['transactions'],
      })
      if (!account) {
        return {
          errorCode: 404,
          message: 'No account found',
        }
      }

      return {
        data: account,
        statusCode: 200,
      }
    } catch (error) {
      next(error)
    }
  }

  async random(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ResponseType<AccountType> | ErrorType> {
    try {
      const accounts = await this.accountRepository.find({
        relations: ['transactions'],
      })
      return {
        data: accounts[Math.floor(Math.random() * accounts.length)],
        statusCode: 200,
      }
    } catch (error) {
      next(error)
    }
  }
}

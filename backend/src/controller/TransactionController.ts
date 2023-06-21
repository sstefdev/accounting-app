import { NextFunction, Request, Response } from 'express'
import {
  ControllerType,
  ErrorType,
  ResponseType,
  TransactionRequest,
  TransactionType,
} from '@app-types'
import { AppDataSource } from '@src/data-source'
import { Account, Transaction } from '@entity/index'

export class TransactionController
  implements ControllerType<ResponseType<TransactionType> | ErrorType>
{
  private transactionRepository = AppDataSource.getRepository(Transaction)
  private accountRepository = AppDataSource.getRepository(Account)

  async create(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ResponseType<TransactionType> | ErrorType> {
    try {
      const { account_id, amount, type } = req.body as TransactionRequest
      if (!account_id || amount < 0 || !type) {
        return {
          errorCode: 400,
          message: 'Missing account_id, amount or type',
        }
      }

      const account = await this.accountRepository.findOne({
        where: {
          account_id,
        },
        relations: ['transactions'],
      })
      if (!account) {
        return {
          errorCode: 404,
          message: 'Account not found',
        }
      }

      let updatedBalance = account.balance
      if (type === 'withdraw') {
        if (account.balance < amount) {
          return {
            errorCode: 400,
            message: 'Insufficient balance',
          }
        }
        updatedBalance -= Number(amount)
      } else if (type === 'deposit') {
        updatedBalance += Number(amount)
      } else {
        return {
          errorCode: 400,
          message: 'Invalid transaction type',
        }
      }

      account.balance = updatedBalance

      const transaction = this.transactionRepository.create({
        account: {
          account_id,
          balance: updatedBalance,
        },
        amount,
        type,
      })

      account.transactions.push(transaction)

      await this.accountRepository.save(account)
      await this.transactionRepository.save(transaction)
      return {
        data: transaction,
        statusCode: 201,
      }
    } catch (error) {
      next(error)
    }
  }

  async one(
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ResponseType<TransactionType> | ErrorType> {
    try {
      const { id: transaction_id } = req.params
      if (!transaction_id) {
        return {
          errorCode: 400,
          message: 'Missing transaction_id',
        }
      }

      const transaction = await this.transactionRepository.findOne({
        where: {
          transaction_id,
        },
        relations: ['account'],
      })

      if (!transaction) {
        return {
          errorCode: 404,
          message: 'Unregistered transaction',
        }
      }

      return {
        data: transaction,
        statusCode: 200,
      }
    } catch (error) {
      next(error)
    }
  }

  async all(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<ResponseType<TransactionType> | ErrorType> {
    try {
      const transactions = await this.transactionRepository.find({
        relations: ['account'],
      })

      return {
        data: transactions,
        statusCode: 200,
      }
    } catch (error) {
      next(error)
    }
  }
}

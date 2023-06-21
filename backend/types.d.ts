/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'

type TypeVariety = 'withdraw' | 'deposit'

/**
Represents the request payload for a transaction.
@interface TransactionRequest
@property {string} account_id - The ID of the account.
@property {number} amount - The transaction amount.
@property {("withdraw" | "deposit")} type - The type of the transaction.
*/
interface TransactionRequest {
  account_id: string
  amount: number
  type: TypeVariety
}

/**
 * Represents the response payload for a transaction.
 * @interface ResponseType<T>
 * @property {T} data - The data of the response.
 * @property {number} statusCode - The status code of the response.
 */
interface ResponseType<T> {
  data: T | T[]
  statusCode: number
}

/**
 * Represents the type of an error.
 * @interface ErrorType
 * @property {string} message - The error message.
 * @property {number} errorCode - The status code of the error.
 */
interface ErrorType {
  message: string
  errorCode: number
}

/**
Represents a transaction.
@interface TransactionType
@property {string} transaction_id - The ID of the transaction.
@property {string} account_id - The ID of the account associated with the transaction.
@property {number} amount - The transaction amount.
@property {("withdraw" | "deposit")} type - The type of the transaction.
@property {string} created_at - The timestamp of when the account was created.
@property {string} updated_at - The timestamp of when the account was last updated.
*/
interface TransactionType {
  transaction_id: string
  account: AccountType
  amount: number
  type: TypeVariety
  created_at: string
  updated_at: string
}

/**
Represents an account.
@interface AccountType
@property {string} account_id - The ID of the account.
@property {number} balance - The account balance.
@property {TransactionType[]} transactions - An array of transactions associated with the account.
@property {string} created_at - The timestamp of when the account was created.
@property {string} updated_at - The timestamp of when the account was last updated.
*/
interface AccountType {
  account_id: string
  balance: number
  transactions: TransactionType[]
  created_at: string
  updated_at: string
}

/**
Represents a route definition.
@interface Route
@property {string} method - The HTTP method of the route.
@property {string} path - The URL path of the route.
@property {any} controller - The controller function or class associated with the route.
@property {string} action - The action to be executed when the route is requested.
*/
interface Route {
  method: string
  path: string
  controller: any
  action: string
  // validation?: ValidationChain[] if we wanted to add epxress-validator to the app
}

/**
Represents a request handler function for Express middleware.
@type {RequestHandler}
@param {Request} request - The Express request object.
@param {Response} response - The Express response object.
@param {NextFunction} next - The next function in the middleware chain.
@returns {Promise<T | string>} - A promise that resolves to a value or an error message.
*/
type RequestHandler<T> = (
  request: Request,
  response: Response,
  next: NextFunction,
) => Promise<T | string>

/**
Represents a controller definition.
@interface ControllerType
@property {RequestHandler<T>} one - The request handler function for retrieving a single item.
@property {RequestHandler<T>} create - The request handler function for creating a new item.
@property {RequestHandler<T | T[]>} all - The request handler function for retrieving multiple items.
@property {RequestHandler<T>} delete - The request handler function for deleting an item.
@type {T} - The type of the item.
*/
interface ControllerType<T> {
  one?: RequestHandler<T>
  create?: RequestHandler<T>
  all?: RequestHandler<T | T[]>
  delete?: RequestHandler<T>
  check?: RequestHandler<string>
}

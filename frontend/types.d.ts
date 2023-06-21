/**
Represents a transaction.
@interface Transaction
@property {string} transaction_id - The ID of the transaction.
@property {Account} account - The account associated with the transaction.
@property {number} amount - The transaction amount.
@property {TransactionType} type - The type of the transaction.
@property {string} created_at - The timestamp indicating when the transaction was created.
@property {string} updated_at - The timestamp indicating when the transaction was last updated.
*/
interface Transaction {
  transaction_id: string
  account: Account
  amount: number
  type: TransactionType
  created_at: string
  updated_at: string
}

/**
  Represents the request payload for a transaction.
  @interface TransactionRequest
  @property {string} account_id - The ID of the account.
  @property {number} amount - The transaction amount.
  @property {TransactionType} type - The type of the transaction.
  */
interface TransactionRequest {
  account_id: string
  amount: number
  type: TransactionType
}

/**  
  Represents an account.
  @interface Account
  @property {string} account_id - The ID of the account.
  @property {number} balance - The account balance.
  @property {Transaction[]} transactions - The list of transactions associated with the account.
  @property {string} [created_at] - The timestamp indicating when the account was created.
  @property {string} [updated_at] - The timestamp indicating when the account was last updated.
  */
interface Account {
  account_id: string //
  balance: number
  transactions: Transaction[]
  created_at?: string
  updated_at?: string
}

/**  
  Represents the type of a transaction.
  @type TransactionType
  @typedef {("deposit" | "withdraw")} TransactionType - The type of the transaction.
  */
type TransactionType = 'deposit' | 'withdraw'

/**  
  Represents the state of the application context.
  @typedef {IAppContextState}
  @property {Account} account - The account data.
  @property {Transaction[]} transactions - The list of transactions.
  @property {boolean} loading - Indicates if the data is being loaded.
  @property {string} error - The error message, if any.
  @property {React.Dispatch<React.SetStateAction<Account>>} setAccount - The function to set the account data.
  @property {React.Dispatch<React.SetStateAction<Transaction[]>>} setTransactions - The function to set the list of transactions.
  @property {React.Dispatch<React.SetStateAction<boolean>>} setLoading - The function to set the loading state.
  @property {React.Dispatch<React.SetStateAction<string>>} setError - The function to set the error message.
  @property {() => Promise<void>} getAllTransactions - A function to fetch all transactions.
  @property {(accountId: Account['account_id']) => Promise<void>} getSingleAccount - A function to fetch a single account by ID.
  @property {(data: TransactionRequest) => Promise<void>} transactionSubmit - A function to submit a transaction.
  */
export type IAppContextState = {
  account: Account
  transactions: Transaction[]
  loading: boolean
  error: string
  setAccount: React.Dispatch<React.SetStateAction<Account>>
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setError: React.Dispatch<React.SetStateAction<string>>
  getAllTransactions: () => Prmoise<void>
  getSingleAccount: (accountId: Account['account_id']) => Prmoise<void>
  transactionSubmit: (data: TransactionRequest) => Prmoise<void>
}

/**
Represents the SVG file type.
@typedef {React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>} SVGComponent - The SVG component.
*/
declare module '*.svg' {
  import * as React from 'react'

  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>

  export default ReactComponent
}

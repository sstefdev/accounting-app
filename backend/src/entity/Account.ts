import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { AccountType } from '@app-types'
import Transaction from './Transaction'

@Entity()
export default class Account implements AccountType {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  account_id: string

  @Column({ default: 0 })
  balance: number

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[]

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string
}

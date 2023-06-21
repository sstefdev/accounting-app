import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm'
import { TransactionType } from '@app-types'
import Account from './Account'

@Entity()
export default class Transaction implements TransactionType {
  @PrimaryColumn('uuid', { generated: 'uuid' })
  transaction_id: string

  @ManyToOne(() => Account)
  account: Account

  @Column()
  amount: number

  @Column()
  type: 'withdraw' | 'deposit'

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string
}

import { PaymentSVG } from '@assets/svg'
import { TransactionType } from '@types'

interface TransactionComponentProps {
  transaction_id: string
  amount: number
  account_id: string
  type: TransactionType
  first: boolean
  balance: number
}

const Transaction = ({ amount, account_id, type, first, balance }: TransactionComponentProps) => (
  <div
    className='flex flex-col transaction'
    data-type='transaction'
    data-amount={amount}
    data-balance={balance}
    data-account-id={account_id}
  >
    <div className='transaction-type'>
      <PaymentSVG className={type === 'deposit' ? 'deposit' : 'withdraw'} />
    </div>
    <div className='flex flex-col bg-[#d2d0d03d] rounded-[8px] p-[12px] gap-[12px] shadow-slate-500 shadow-sm'>
      <p>
        Transfered <span className='font-mono font-bold'>{amount}$</span>{' '}
        {type === 'deposit' ? 'to' : 'from'} account{' '}
        <span className='font-mono font-bold'>{account_id}</span>
      </p>
      {first && (
        <p>
          The current account ballance <span className='font-mono font-bold'>{balance}$</span>
        </p>
      )}
    </div>
  </div>
)

export default Transaction

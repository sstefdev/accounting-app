/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { Button, Input, CheckBox } from '@components/common'
import { TransactionRequest, TransactionType } from '@types'
import { useAppContext } from '@utils/useAppContext'

const CreateTransaction = () => {
  const { account, error, setLoading, getAllTransactions, getSingleAccount, transactionSubmit } =
    useAppContext()
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionRequest>({
    defaultValues: {
      type: false as unknown as TransactionType,
    },
  })

  const submitForm = async (data: TransactionRequest) => {
    const transactionType = handleTypeChange(data.type ? true : false)

    try {
      await transactionSubmit({
        ...data,
        type: transactionType,
      })
      await getAllTransactions()
      await getSingleAccount(account.account_id)

      setLoading(false)
      reset()
    } catch (error: any) {
      console.error('Error when creating transaction:', error)
      setLoading(false)
      reset()
    }
  }

  const handleTypeChange = (type: boolean) => {
    return type ? 'deposit' : 'withdraw'
  }

  return (
    <div className='create-transaction flex flex-col h-full w-full gap-[20px] max-w-[500px]'>
      <h1 className='text-2xl font-bold'>Submit new transaction</h1>
      <form
        className='flex flex-col gap-[20px] bg-[#d2d0d03b] rounded-[16px] p-[42px] box-shadow[rgba(0, 0, 0, 0.24) 0px 3px 8px]'
        onSubmit={handleSubmit(submitForm)}
      >
        <Input
          id='account_id'
          error={errors['account_id']}
          label='Account ID'
          type='text'
          data-type='account-id'
          {...register('account_id', {
            required: 'Account Id is required.',
            minLength: {
              value: 36,
              message: 'AccountId must be 36 characters.',
            },
          })}
        />
        <Input
          id='amount'
          error={errors['amount']}
          label='Amount'
          type='number'
          data-type='amount'
          {...register('amount', {
            required: 'Amount is required.',
            min: {
              value: 1,
              message: 'Amount must be greater then 0.',
            },
            max: {
              value: 1000000,
              message: 'Amount must be less than or equal to 1000000.',
            },
          })}
        />
        <CheckBox {...register('type')} id='type' uncheckedText='Withdraw' checkedText='Deposit' />
        <Button text='Submit' data-type='transaction-submit' type='submit' />
        {error && <span className='text-red-500 animation-disappear'>{error}</span>}
      </form>
    </div>
  )
}

export default CreateTransaction

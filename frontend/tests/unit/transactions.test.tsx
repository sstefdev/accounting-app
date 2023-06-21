/// <reference types="@types/jest" />;
import '@testing-library/jest-dom'
import React from 'react'
import { createMemoryHistory, MemoryHistory } from 'history'
import { screen, fireEvent, waitFor, act } from '@testing-library/react'

import { CreateTransaction, TransactionList } from '../../src/components/transaction'
import { getByTextContent, renderWithAppWrapper } from '../../src/utils/test-utils'

const mockContextValue = {
  account: {
    account_id: '',
    balance: 1000,
    transactions: [],
  },
  setLoading: jest.fn(),
  error: '',
  getAllTransactions: jest.fn(),
  getSingleAccount: jest.fn(),
  transactionSubmit: jest.fn(),
  reset: jest.fn(),
}

describe('CreateTransaction', () => {
  let history: MemoryHistory

  beforeEach(() => {
    history = createMemoryHistory()
  })

  it('renders the form correctly', () => {
    renderWithAppWrapper(<CreateTransaction />, mockContextValue)

    expect(screen.getByLabelText('Account ID')).toBeInTheDocument()
    expect(screen.getByLabelText('Amount')).toBeInTheDocument()
    expect(screen.getByText('Withdraw')).toBeInTheDocument()
    expect(screen.getByText('Submit')).toBeInTheDocument()
  })

  it('submits the form and calls the necessary functions', async () => {
    renderWithAppWrapper(<CreateTransaction />, mockContextValue)

    await act(async () => {
      fireEvent.input(screen.getByLabelText('Account ID'), {
        target: { value: 'a357de76-e24c-44db-8914-cfd32edd0007' },
      })
      fireEvent.input(screen.getByLabelText('Amount'), { target: { value: '500' } })
      fireEvent.click(screen.getByText('Withdraw'))

      fireEvent.submit(screen.getByText('Submit'))
    })

    await waitFor(() => {
      expect(mockContextValue.transactionSubmit).toHaveBeenCalledTimes(1)
      expect(mockContextValue.transactionSubmit).toHaveBeenCalledWith({
        account_id: 'a357de76-e24c-44db-8914-cfd32edd0007',
        amount: '500',
        type: 'deposit',
      })

      expect(mockContextValue.getAllTransactions).toHaveBeenCalledTimes(1)
      expect(mockContextValue.getSingleAccount).toHaveBeenCalledTimes(1)
      expect(mockContextValue.setLoading).toHaveBeenCalledWith(false)
      expect(screen.getByLabelText('Account ID')).toHaveValue('')
      expect(screen.getByLabelText('Amount')).toHaveValue(null)
    })
  })
})

describe('TransactionList', () => {
  it('renders skeleton components when loading is true', () => {
    renderWithAppWrapper(<TransactionList title='Transaction History' />, {
      ...mockContextValue,
      loading: true,
    })

    expect(screen.getAllByTestId('skeleton-component')).toHaveLength(5)
  })

  it('renders transaction components when loading is false and transactions exist', () => {
    const mockTransactions = [
      {
        transaction_id: '1',
        created_at: '2023-06-01',
        updated_at: '2023-06-01',
        account: {
          balance: 1000,
          account_id: 'a357de76-e24c-44db-8914-cfd32edd0007',
          transactions: [],
        },
        amount: 20,
        type: 'deposit',
      },
      {
        transaction_id: '2',
        created_at: '2023-06-02',
        updated_at: '2023-06-01',
        account: {
          balance: 800,
          account_id: 'a357de76-e24c-44db-8914-cfd32edd0007',
          transactions: [],
        },
        amount: 10,
        type: 'withdraw',
      },
    ]

    renderWithAppWrapper(<TransactionList title='Transaction History' />, {
      ...mockContextValue,
      loading: false,
      transactions: mockTransactions,
    })

    expect(
      getByTextContent('Transfered 20$ to account a357de76-e24c-44db-8914-cfd32edd0007'),
    ).toBeInTheDocument()
    expect(
      getByTextContent('Transfered 10$ from account a357de76-e24c-44db-8914-cfd32edd0007'),
    ).toBeInTheDocument()
  })

  it('renders "No transactions" when loading is false and transactions array is empty', () => {
    renderWithAppWrapper(<TransactionList title='Transaction History' />, {
      ...mockContextValue,
      loading: false,
      transactions: [],
    })

    expect(screen.getByText('No transactions')).toBeInTheDocument()
  })
})

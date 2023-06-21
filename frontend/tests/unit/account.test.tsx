/// <reference types="@types/jest" />;
import '@testing-library/jest-dom'
import React from 'react'
import { screen } from '@testing-library/react'

import { renderWithAppWrapper, getByTextContent } from '../../src/utils/test-utils'
import { AccountInfo } from '../../src/components/account'

describe('AccountInfo', () => {
  it('renders account information correctly when account_id exists', () => {
    const mockContextValue = {
      account: {
        account_id: 'a357de76-e24c-44db-8914-cfd32edd0007',
        balance: 1000,
      },
    }

    renderWithAppWrapper(<AccountInfo />, mockContextValue)

    expect(screen.getByText('Account Information')).toBeInTheDocument()
    expect(screen.getByText('ID: a357de76-e24c-44db-8914-cfd32edd0007')).toBeInTheDocument()
    expect(screen.getByText('Balance:')).toBeInTheDocument()
    expect(screen.getByText('1000$')).toBeInTheDocument()
  })

  it('renders skeleton loading state when loading is true', () => {
    const mockContextValue = {
      account: {
        account_id: '',
        balance: 0,
      },
      loading: true,
    }

    renderWithAppWrapper(<AccountInfo />, mockContextValue)

    expect(screen.getByText('Account Information')).toBeInTheDocument()
    expect(screen.getByTestId('skeleton-component')).toBeInTheDocument()
    expect(screen.queryByText('ID:')).toBeNull()
    expect(getByTextContent('Balance: 0$')).toBeInTheDocument()
  })
})

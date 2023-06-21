import React from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps {
  id: string
  'data-type': string
  error: FieldError | undefined
  name: string
  type: string
  label: string
  value?: string
  placeholder?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...rest }: InputProps, ref) => (
    <div>
      <label htmlFor={rest.name} className='mb-[20px]'>
        {label}
      </label>
      <input
        ref={ref}
        className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-gray-700 block w-full p-2.5 invalid:outline-red-500'
        {...rest}
      />
      {error && <span className='text-red-500'>{error.message}</span>}
    </div>
  ),
)

export default Input

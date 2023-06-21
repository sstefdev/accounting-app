import React from 'react'

interface CheckboxProps {
  id: string
  name: string
  uncheckedText: string
  checkedText: string
  ref: React.RefObject<HTMLInputElement>
}

const CheckBox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ uncheckedText, checkedText, ...rest }: CheckboxProps, ref) => (
    <div className='checkbox-wrapper'>
      <input className='switch' type='checkbox' {...rest} ref={ref} />
      <label htmlFor={rest.id} className='w-[fit-content]'>
        <span className='switch-x-text'></span>
        <span className='switch-x-toggletext'>
          <span className='switch-x-unchecked'>
            <span className='switch-x-hiddenlabel'>Unchecked: </span>
            {uncheckedText}
          </span>
          <span className='switch-x-checked'>
            <span className='switch-x-hiddenlabel'>Checked: </span>
            {checkedText}
          </span>
        </span>
      </label>
    </div>
  ),
)

export default CheckBox

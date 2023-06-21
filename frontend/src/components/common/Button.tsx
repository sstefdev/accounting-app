interface ButtonProps {
  'data-type'?: string
  type: 'button' | 'submit' | 'reset'
  text: string
  className?: string
  icon?: React.ReactNode
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}

const Button = ({ text, icon, className, ...props }: ButtonProps) => {
  return (
    <button className={`button ${className}`} role='button' {...props}>
      {text}
      {icon}
    </button>
  )
}

export default Button

import { useMemo } from 'react'
import style from '@/styles/shared/common/button.module.css'

interface ButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  variant?: 'primary' | 'base' | undefined
  block?: boolean
  busy?: boolean
}

const buttonClasses = {
  primary: 'text-white bg-orange-600 hover:bg-orange-700',
  base: 'text-foreground bg-btn-background hover:bg-btn-background-hover',
}

export default function Button({ children, variant, type, onClick, block, busy }: ButtonProps) {
  const buttonType = useMemo(() => {
    return type || 'button'
  }, [type])

  const variantClasses = useMemo(() => {
    return variant && buttonClasses?.[variant] ? buttonClasses?.[variant] : buttonClasses['base']
  }, [variant])

  return (
    <button disabled={busy} type={buttonType} onClick={onClick} className={`${style.button} ${variantClasses}${block ? ' w-full d-block justify-center' : ''}`}>
      {busy && (
        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}

      {children}
    </button>
  )
}

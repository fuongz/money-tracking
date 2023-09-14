import { useMemo } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset' | undefined
  onClick?: () => void
  block?: boolean
  busy?: boolean
  href?: string
}

export default function PhakeButton({ children, href, type, onClick, block, busy }: ButtonProps) {
  const buttonType = useMemo(() => {
    return type || 'button'
  }, [type])

  return href ? (
    <Button asChild type="button" className={`${block ? ' w-full d-block justify-center' : ''}`}>
      <Link href={href}>
        {busy && <LoadingIcon />}
        {children}
      </Link>
    </Button>
  ) : (
    <Button disabled={busy} type={buttonType} onClick={onClick} className={`${block ? ' w-full d-block justify-center' : ''}`}>
      {busy && <LoadingIcon />}
      {children}
    </Button>
  )
}

const LoadingIcon = () => {
  return (
    <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  )
}

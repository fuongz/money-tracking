import { useMemo } from 'react'

interface MessageComponentProps {
  type?: 'info' | 'error' | 'success'
  children: React.ReactNode
  className?: string
}

const typeClasses = {
  error: 'text-red-600 bg-red-100',
  info: 'text-white',
  success: 'text-green-600 bg-green-100',
}

export default function Message({ children, type, className }: MessageComponentProps) {
  const defaultClasses = 'text-sm px-4 py-2 rounded'
  const classes = useMemo(() => {
    return (type && typeClasses?.[type]) || ''
  }, [type])
  return <div className={`${classes} ${defaultClasses}${className ? ' ' + className : ''}`}>{children}</div>
}

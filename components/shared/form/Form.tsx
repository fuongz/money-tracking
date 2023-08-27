import { type ReactNode } from 'react'

import styles from '@/styles/shared/form/form.module.css'

import { useFormContext } from 'react-hook-form'
import { randomString } from '@/utils/string.utils'

interface FormInputComponentProps {
  type?: string
  autoComplete?: string
  name: string
  id?: string
  placeholder?: string
  className?: string
  numberformat?: string
  options?: any[]
  required?: boolean
  label?: string
  suffix?: ReactNode
  min?: number
  step?: number
  custom_type?: string | 'province'
  disabled?: boolean
}

const CommonInput = ({ type, autoComplete, name, ...rest }: FormInputComponentProps) => {
  const { register } = useFormContext()
  return (
    <>
      <input autoComplete={autoComplete} {...register(name)} type={type || 'text'} {...rest} />
    </>
  )
}

const InputElement = (props: FormInputComponentProps) => {
  return <CommonInput {...props} />
}

export const Input = (props: FormInputComponentProps) => {
  const {
    formState: { errors },
  } = useFormContext()

  const propsNameArr = props.name.split('.')

  const inputId = props?.id || randomString(10)
  const inputRequired = props?.required || false
  let errorMessage: string = ''

  if (propsNameArr.length > 1) {
    const errMessageReduce = propsNameArr.reduce((acc: any, cur: any) => (acc[cur] ? acc[cur] : ''), errors)
    if (typeof errMessageReduce === 'object') {
      errorMessage = errMessageReduce?.message ? (errMessageReduce?.message as string) : ''
    }
  } else {
    errorMessage = errors?.[props.name]?.message ? (errors?.[props.name]?.message as string) : ''
  }
  const hasError = errorMessage !== ''
  const { placeholder, ...newInputProps } = props

  return (
    <div className={`${styles['form-control']} ${styles[`form-control--${props.type}`]} ${hasError ? styles['form-control--has-error'] : ''}`}>
      <label htmlFor={inputId}>
        {props.label || ''}
        {inputRequired && <span className={styles['label--is-required']}>*</span>}
      </label>
      <div className={`${styles['form-control__input']} ${props?.suffix ? styles['form-control__input--has-suffix'] : ''}`}>
        <InputElement placeholder={placeholder as string as string} {...newInputProps} />
        {props?.suffix}
      </div>
      {hasError && errorMessage && <span className={styles['input--has-error']}>{errorMessage}</span>}
    </div>
  )
}

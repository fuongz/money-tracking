import * as yup from 'yup'

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`
}

yup.addMethod<yup.StringSchema>(yup.string, 'password', function (errorMessage) {
  return this.min(8, 'Password must have at least 8 characters')
    .matches(/[0-9]/, getCharacterValidationError('digit'))
    .matches(/[a-z]/, getCharacterValidationError('lowercase'))
    .matches(/[A-Z]/, getCharacterValidationError('uppercase'))
})

yup.addMethod<yup.StringSchema>(yup.string, 'passwordConfirmation', function (errorMessage) {
  return this.required().oneOf([yup.ref('password')], 'Password does not match')
})

declare module 'yup' {
  interface StringSchema {
    password(): StringSchema<yup.Maybe<string>, yup.AnyObject>
    passwordConfirmation(): StringSchema<yup.Maybe<string>, yup.AnyObject>
  }
}

export default yup

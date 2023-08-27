import yup from '@/utils/yup.validation'

export type USignUpSchemaType = {
  email: string
  password: string
  password_confirmation: string
}

export const schema = yup.object<USignUpSchemaType>().shape({
  email: yup.string().email().required(),
  password: yup.string().password().required(),
  password_confirmation: yup.string().passwordConfirmation().required(),
})

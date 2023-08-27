import * as yup from 'yup'

export type USignInSchemaType = {
  email: string
  password: string
}

export const schema = yup.object<USignInSchemaType>().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
})

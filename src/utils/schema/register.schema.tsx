import * as yup from 'yup'

export interface RegisterSchemaInputs {
  email: string
  password: string
  firstName: string
  lastName: string
  role?: string
}

export const RegisterSchema = yup.object().shape({
  email: yup.string().email().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
//   role: yup.string().required(),
  password: yup.string().required()
})
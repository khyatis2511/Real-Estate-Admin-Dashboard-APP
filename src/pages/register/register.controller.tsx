import { yupResolver } from '@hookform/resolvers/yup'
import { useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toasterConfig } from '../../components/contexts/layoutContext'
import { registerAPI } from '../../lib/api/auth.api'
import { RegisterSchema, RegisterSchemaInputs } from '../../utils/schema/register.schema'
import RegisterView from './register.view'

const RegisterController: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)
  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm<RegisterSchemaInputs>({
    resolver: yupResolver(RegisterSchema)
  })

  const onSubmit = async (values: RegisterSchemaInputs): Promise<any> => {
    console.log('on submit called: ');
    try {
      setSubmitLoading(true)
      const payload = {
        email: values?.email,
        password: values?.password,
        firstName: values?.firstName,
        lastName: values?.lastName,
        role: values?.role ?? 'Admin'
      }
      const res = await registerAPI(payload)
      if (res.success) {
          navigate('/login')
      }
      setSubmitLoading(false)
    } catch (error: any) {
      console.error('login error: ', error)
      toast.error(error.message, toasterConfig)
      setSubmitLoading(false)
    }
  }
  return (
    <RegisterView {...{
      control,
      handleSubmit,
      errors,
      onSubmit,
      submitLoading
    }} />
  )
}

export default RegisterController
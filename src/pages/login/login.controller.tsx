import { yupResolver } from '@hookform/resolvers/yup'
import React, { useContext, useState, type FC } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LayoutContext, toasterConfig } from '../../components/contexts/layoutContext'
import LoginView from './login.view'
import { LoginSchema, LoginSchemaInputs } from '../../utils/schema/login.schema'
import { loginAPI, whoAmI } from '../../lib/api/auth.api'

const LoginController: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)

  const [, setCookie] = useCookies(['auth'])
  const { setLoginUserData } = useContext(LayoutContext)
  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm<LoginSchemaInputs>({
    resolver: yupResolver(LoginSchema)
  })

  const onSubmit = async (values: LoginSchemaInputs): Promise<any> => {
    try {
      setSubmitLoading(true)
      const payload = {
        email: values?.email,
        password: values?.password
      }
      const res = await loginAPI(payload)
      if (res.success && res?.data?.token) {
        const authCookie = {
          session: {
            accessToken: res?.data?.token
          }
        }

        const expirationTime = new Date(Date.now() + 5 * 60 * 60 * 1000)
        setCookie('auth', JSON.stringify(authCookie), { path: '/', expires: expirationTime })

        const userData = await whoAmI(`Bearer ${res?.data?.token}`)
        console.log('user data : ', userData);
        if (userData?.success) {
          setLoginUserData(userData?.data)
          navigate('/')
        }
      }
      setSubmitLoading(false)
    } catch (error: any) {
      console.error('login error: ', error)
      toast.error(error.message, toasterConfig)
      setSubmitLoading(false)
    }
  }
  return (
    <LoginView {...{
      control,
      handleSubmit,
      errors,
      onSubmit,
      submitLoading
    }} />
  )
}

export default LoginController
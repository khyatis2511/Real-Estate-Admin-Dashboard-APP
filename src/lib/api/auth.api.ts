/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosAPI } from "../../utils/helpers"

export const loginAPI = async (payload: any): Promise<any> => {
  return await axiosAPI({
    url: '/auth/login',
    method: 'POST',
    data: payload
  })
}

export const registerAPI = async (payload: any): Promise<any> => {
  return await axiosAPI({
    url: '/auth/register',
    method: 'POST',
    data: payload
  })
}

export const whoAmI = async (authorization?: string): Promise<any> => {
  return await axiosAPI({
    url: '/auth/who-am-i',
    method: 'GET',
    headers: {
      authorization
    }
  })
}

export const logoutAPI = async (): Promise<any> => {
  return await axiosAPI({
    url: '/auth/logout',
    method: 'POST',
  })
}

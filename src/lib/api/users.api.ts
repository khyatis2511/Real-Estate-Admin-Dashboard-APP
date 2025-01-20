/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosAPI } from "../../utils/helpers"

export const getUsersAPI = async (page: number, limit: number, status: string): Promise<any> => {
  return await axiosAPI({
    url: `/admin/users?page=${page}&limit=${limit}&status=${status}`,
    method: 'GET',
  })
}

export const updateUserStatusAPI = async (payload: any): Promise<any> => {
  return await axiosAPI({
    url: '/admin/users',
    method: 'PUT',
    data: payload
  })
}

export const getUserCountsAPI = async (): Promise<any> => {
  return await axiosAPI({
    url: '/admin/users/counts',
    method: 'GET',
  })
}


/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosAPI } from "../../utils/helpers"

export const getActivityLogsAPI = async (page: number, limit: number): Promise<any> => {
  return await axiosAPI({
    url: `/admin/activity?page=${page}&limit=${limit}`,
    method: 'GET',
  })
}

export const updateUserStatusAPI = async (payload: any): Promise<any> => {
  return await axiosAPI({
    url: '/admin/activity',
    method: 'PUT',
    data: payload
  })
}

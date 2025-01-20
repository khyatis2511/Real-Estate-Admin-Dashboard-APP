/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosAPI } from "../../utils/helpers"

export const getAnalyticsLogsAPI = async (): Promise<any> => {
  return await axiosAPI({
    url: `/admin/analytics`,
    method: 'GET',
  })
}

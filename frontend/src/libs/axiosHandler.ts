/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const apiURL = process.env.VITE_API_URL

async function apiHandler<T>(config: AxiosRequestConfig, endpoint: string): Promise<T> {
  try {
    const response: AxiosResponse<T> = await axios({
      url: `${apiURL}/v1/api/${endpoint}`,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'An error occurred')
  }
}

export default apiHandler

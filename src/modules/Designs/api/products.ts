import { ProductProps } from '@/utils/types'
import axios from 'axios'

export type SusccessResponse<T> = {
  success: true
  data: T
}

export type FailedResponse = {
  success: false
  message: string
}

type ResponseType<T> = SusccessResponse<T> | FailedResponse

export type ProductsFilter = {
  search?: string
}

export const getProducts = async (filters: ProductsFilter) => {
  const { search } = filters
  let url = `/api/products`

  if (search) {
    url += `?search=${search}`
  }

  const response = await axios.get<ResponseType<ProductProps[]>>(url)
  if (response.data.success) {
    return response.data.data
  } else {
    throw new Error(response.data.message)
  }
}

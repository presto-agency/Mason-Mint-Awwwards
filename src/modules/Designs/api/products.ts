import { ProductProps } from '@/utils/types'
import axios from 'axios'

type PaginateData<T> = {
  docs: T
  total: number
  pages: number
  page: number
  limit: number
}

export type SusccessResponse<T> = {
  success: true
  data: PaginateData<T>
}

export type FailedResponse = {
  success: false
  message: string
}

type ResponseType<T> = SusccessResponse<T> | FailedResponse

export type ProductsFilter = {
  limit?: number
  search?: string
  category?: string
}

export const getProducts = async (page = 1, filters: ProductsFilter) => {
  const { limit = 10, search, category } = filters
  let url = `/api/products?page=${page}&limit=${limit}`

  if (search) {
    url += `&search=${search}`
  }

  if (category) {
    url += `&category=${category}`
  }
  const response = await axios.get<ResponseType<ProductProps[]>>(url)
  if (response.data.success) {
    return response.data
  } else {
    throw new Error(response.data.message)
  }
}

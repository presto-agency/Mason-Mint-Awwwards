import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import axios, { AxiosResponse } from 'axios'
import Container from '@/app/layouts/Container'
import { CategoryProps, ProductProps } from '@/utils/types'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import { useModal } from '@/hooks/useModal'
import routes from '@/utils/routes'
const ProductManipulatedSuccessModal = dynamic(
  () => import('@/modals/ProductManipulatedSuccess/ProductManipulatedSuccess'),
  { ssr: false }
)

import styles from '../../Admin.module.scss'
import ProductForm from '@/ui/ProductForm/ProductForm'

const ProductEdit: FC<{
  product: ProductProps
  categories: CategoryProps[]
}> = ({ product, categories }) => {
  const { query } = useRouter()
  const [productState, setProductState] = useState(product)
  const [loading, setLoading] = useState(false)
  const openSuccessModal = useModal(ProductManipulatedSuccessModal, {
    size: 'md',
  })

  const handleEdit = async (data: ProductProps) => {
    setLoading(true)
    await axios
      .put(`/api/products/${query.id}/edit`, data)
      .then(({ data: { success, data } }: AxiosResponse) => {
        if (success) {
          setProductState(data)
          setLoading(false)
          openSuccessModal()
        }
      })
  }

  return (
    <main className={styles['admin']}>
      <Container>
        <ButtonPrimary
          href={routes.private.products}
          backwardArrows
          size="small"
        >
          Back to list
        </ButtonPrimary>
        <ProductForm
          product={productState}
          categories={categories}
          onValues={handleEdit}
          loading={loading}
        />
      </Container>
    </main>
  )
}

export default ProductEdit

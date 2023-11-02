import { CategoryProps, ProductProps } from '@/utils/types'
import dynamic from 'next/dynamic'
import axios, { AxiosResponse } from 'axios'
import Container from '@/app/layouts/Container'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import routes from '@/utils/routes'
import ProductForm from '@/ui/ProductForm/ProductForm'
import { useState } from 'react'
import { useModal } from '@/hooks/useModal'
const ProductManipulatedSuccessModal = dynamic(
  () => import('@/modals/ProductManipulatedSuccess/ProductManipulatedSuccess'),
  { ssr: false }
)

import styles from '@/modules/Admin/Admin.module.scss'

const ProductCreate = ({ categories }: { categories: CategoryProps[] }) => {
  const [loading, setLoading] = useState(false)
  const openSuccessModal = useModal(ProductManipulatedSuccessModal, {
    size: 'md',
  })

  const handleCreate = async (data: ProductProps) => {
    setLoading(true)
    await axios
      .post(`/api/products/create`, data)
      .then(({ data: { success, data } }: AxiosResponse) => {
        if (success) {
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
          categories={categories}
          onValues={handleCreate}
          loading={loading}
        />
      </Container>
    </main>
  )
}

export default ProductCreate

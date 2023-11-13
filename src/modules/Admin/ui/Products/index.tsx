import { FC, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import Container from '@/app/layouts/Container'
import { ProductProps } from '@/utils/types'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import { deleteFile } from '@/utils/s3Client/deleteFile'
import { getFileNameFromCloudUrl } from '@/utils/string/getFileNameFromCloudUrl'
import routes from '@/utils/routes'

import styles from '@/modules/Admin/Admin.module.scss'

const AdminProducts: FC<{ products: ProductProps[] }> = ({ products }) => {
  const [_products, setProducts] = useState(products || [])

  const handleRemove = async (product: ProductProps) => {
    if (window.confirm('Do you really want to delete that product?')) {
      /* remove main images on cloud */
      if (product.mainImages?.obverse) {
        await deleteFile(
          getFileNameFromCloudUrl(product.mainImages.obverse as string)
        )
      }
      if (product.mainImages?.reverse) {
        await deleteFile(
          getFileNameFromCloudUrl(product.mainImages.reverse as string)
        )
      }
      /* remove additional images cloud */
      if (product.additionalImages) {
        for (const additionalImage of product.additionalImages) {
          await deleteFile(getFileNameFromCloudUrl(additionalImage.ImageUrl))
        }
      }

      await axios
        .delete(`/api/products/${product.id}/delete`)
        .then(({ data: { success, data } }: AxiosResponse) => {
          if (success) {
            const deletedProductId = data.id
            setProducts(
              products.filter((product) => product.id !== deletedProductId)
            )
          }
        })
    }
  }

  return (
    <main className={styles['admin']}>
      <Container>
        <div className={styles['admin__table_header']}>
          <h3 className="h3">Products</h3>
          <div className={styles['admin__table_header_actions']}>
            <Link href={routes.private.productCreate}>
              <ButtonPrimary variant="white" size="small">
                Create product
              </ButtonPrimary>
            </Link>
            <ButtonPrimary
              variant="white"
              size="small"
              arrows={false}
              onClick={() => signOut()}
            >
              Logout
            </ButtonPrimary>
          </div>
        </div>
        <table className={styles['admin__table']}>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th>Name</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {_products.map((product, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>
                    {product.mainImages?.obverse ? (
                      <Image
                        src={product.mainImages.obverse}
                        alt={product.ProductName}
                        width={100}
                        height={100}
                        style={{ marginRight: '10rem', objectFit: 'contain' }}
                      />
                    ) : null}
                  </td>
                  <td>{product.ProductName}</td>
                  <td>{product.category?.name}</td>
                  <td>
                    <div className={styles['admin__table_actions']}>
                      <ButtonPrimary
                        className={styles['admin__button']}
                        arrows={false}
                        variant="blue"
                        size="small"
                        href={`${routes.private.products}/${product.id}/edit`}
                      >
                        Edit
                      </ButtonPrimary>
                      <ButtonPrimary
                        className={styles['admin__button']}
                        arrows={false}
                        size="small"
                        onClick={() => handleRemove(product)}
                      >
                        Remove
                      </ButtonPrimary>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Container>
    </main>
  )
}

export default AdminProducts

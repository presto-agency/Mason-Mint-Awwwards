import { FC } from 'react'
import Image from 'next/image'
import Container from '@/app/layouts/Container'
import { ProductProps } from '@/utils/types'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import routes from '@/utils/routes'

import styles from '@/modules/Admin/Admin.module.scss'

const AdminProducts: FC<{ products: ProductProps[] }> = ({ products }) => {
  return (
    <main className={styles['admin']}>
      <Container>
        <div className={styles['admin__table_header']}>
          <h3 className="h3">Products</h3>
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
            {products.map((product, index) => {
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

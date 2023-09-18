import { FC } from 'react'
import classNames from 'classnames'
import { ProductProps } from '@/utils/types'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import styles from './DesignsDetailGalley.module.scss'

type DesignsDetailGalleryProps = {
  product: ProductProps | null
  className?: string
}

const DesignsDetailGallery: FC<DesignsDetailGalleryProps> = ({
  product,
  className,
}) => {
  return (
    <div className={classNames(styles['gallery'], className)}>
      <div className="row">
        {product?.additionalImages && product.additionalImages.length > 0
          ? product.additionalImages.map((image, index) => (
              <div key={index} className="col-md-6">
                <BackgroundImage
                  className={styles['gallery__item']}
                  src={image.ImageUrl || ''}
                  alt="ProductOld galley image"
                  quality={100}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  )
}

export default DesignsDetailGallery

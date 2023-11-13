import { FC, useCallback } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import ModalWindow, { ModalWindowProps } from '@/ui/ModalWindow/ModalWindow'
import Exclamation from '@/ui/Icons/Exclamation'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'

import styles from './Error.module.scss'

const ErrorModal: FC<ModalWindowProps> = (props) => {
  const router = useRouter()

  const handleReload = useCallback(() => {
    router.reload()
  }, [router])

  return (
    <ModalWindow {...props} className={styles['errorModal']}>
      <div className={styles['modal']}>
        <div className={styles['modal__icon']}>
          <Exclamation className={styles['modal__icon_item']} />
        </div>
        <p className={classNames('h4', styles['modal__title'])}>
          Oops! Something Went Wrong.
        </p>
        <ButtonPrimary
          fullWidth
          variant="blue"
          arrows={false}
          size="small"
          onClick={handleReload}
        >
          Try again
        </ButtonPrimary>
      </div>
    </ModalWindow>
  )
}

export default ErrorModal

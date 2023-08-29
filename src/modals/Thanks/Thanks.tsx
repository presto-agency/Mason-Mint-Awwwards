import { FC } from 'react'
import ModalWindow, { ModalWindowProps } from '@/ui/ModalWindow/ModalWindow'
import ThanksMessage from '@/ui/ThanksMessage/ThanksMessage'
import ThumbSvg from '@/modals/Thanks/assets/images/thumb.svg'

import styles from './Thanks.module.scss'

const ThanksModal: FC<ModalWindowProps> = (props) => {
  return (
    <ModalWindow {...props}>
      <div className={styles['modal']}>
        <div className={styles['modal__message']}>
          <ThanksMessage />
        </div>
        <div className={styles['modal__thumb']}>
          <ThumbSvg className={styles['modal__thumb_item']} />
        </div>
      </div>
    </ModalWindow>
  )
}

export default ThanksModal

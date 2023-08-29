import { FC } from 'react'
import classNames from 'classnames'

import styles from './ThanksMessage.module.scss'

type ThanksMessageProps = {
  className?: string
}

const ThanksMessage: FC<ThanksMessageProps> = ({ className }) => {
  return (
    <div className={classNames(styles['thanks'], className)}>
      <h3 className={classNames('', styles['thanks__title'])}>Thank You!</h3>
      <p className={styles['thanks__subtitle']}>
        Your submission has been received!
      </p>
      <p className={styles['thanks__detail']}>
        We will reach out to you shortly.
      </p>
    </div>
  )
}

export default ThanksMessage

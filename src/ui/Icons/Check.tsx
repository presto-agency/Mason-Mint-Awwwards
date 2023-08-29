import { FC } from 'react'
import classNames from 'classnames'

import styles from '@/ui/Icons/Icons.module.scss'

const Check: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 11 9"
      fill="none"
      className={classNames(styles['icon'], styles['iconCheck'], className)}
    >
      <path
        d="M1 5.00003L3.5 7.50003L9.5 1.50003"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Check

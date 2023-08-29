import { FC } from 'react'
import classNames from 'classnames'

import styles from './Icons.module.scss'

const ArrowSelect: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 16 9"
      fill="none"
      className={classNames(styles['icon'], className)}
    >
      <path
        d="M15 1C9.5 1 8 8 8 8C8 8 7 1 1 0.999999"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowSelect

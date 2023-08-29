import { FC } from 'react'
import classNames from 'classnames'

import styles from '@/ui/Icons/Icons.module.scss'

const Close: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={classNames(styles['icon'], styles['iconClose'], className)}
    >
      <path
        d="M15 1L1 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1L15 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Close

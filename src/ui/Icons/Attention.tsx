import { FC } from 'react'
import classNames from 'classnames'

import styles from '@/ui/Icons/Icons.module.scss'

const Attention: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={classNames(styles['icon'], styles['iconAttention'], className)}
    >
      <path
        d="M7.99992 10.6666V7.99992M7.99992 5.33325H8.00659M14.6666 7.99992C14.6666 11.6818 11.6818 14.6666 7.99992 14.6666C4.31802 14.6666 1.33325 11.6818 1.33325 7.99992C1.33325 4.31802 4.31802 1.33325 7.99992 1.33325C11.6818 1.33325 14.6666 4.31802 14.6666 7.99992Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Attention

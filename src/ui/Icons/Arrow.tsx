import { FC } from 'react'
import classNames from 'classnames'

import styles from './Icons.module.scss'

const Arrow: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 21 16"
      fill="none"
      className={classNames(styles['icon'], className)}
    >
      <path
        d="M1 8L20 8"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13 1C13 6.5 20 8 20 8C20 8 13 9 13 15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Arrow

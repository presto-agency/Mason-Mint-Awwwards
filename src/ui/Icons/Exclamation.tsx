import { FC } from 'react'
import classNames from 'classnames'

import styles from '@/ui/Icons/Icons.module.scss'

const Exclamation: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 25 24"
      fill="none"
      className={classNames(
        styles['icon'],
        styles['iconExclamation'],
        className
      )}
    >
      <path
        d="M12.5 22C18.0228 22 22.5 17.5228 22.5 12C22.5 6.47715 18.0228 2 12.5 2C6.97715 2 2.5 6.47715 2.5 12C2.5 17.5228 6.97715 22 12.5 22Z"
        fill="currentColor"
      />
      <path
        d="M12.5 8V12"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 16H12.51"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Exclamation

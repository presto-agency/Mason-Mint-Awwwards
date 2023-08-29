import { FC } from 'react'
import classNames from 'classnames'

import styles from '@/ui/Icons/Icons.module.scss'

const Resize: FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 17 16"
      fill="none"
      className={classNames(styles['icon'], styles['iconResize'], className)}
    >
      <line
        x1="1.06728"
        y1="11.2743"
        x2="13.3469"
        y2="0.970529"
        stroke="currentColor"
      />
      <line
        x1="5.17079"
        y1="10.8206"
        x2="12.1877"
        y2="4.93271"
        stroke="currentColor"
      />
      <line
        x1="8.39736"
        y1="11.1029"
        x2="11.9058"
        y2="8.15894"
        stroke="currentColor"
      />
    </svg>
  )
}

export default Resize

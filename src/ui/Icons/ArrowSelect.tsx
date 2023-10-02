import { SVGProps, forwardRef } from 'react'
import classNames from 'classnames'

import styles from './Icons.module.scss'

interface ArrowSelectProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const ArrowSelect = forwardRef<SVGSVGElement, ArrowSelectProps>(
  ({ className }, ref) => {
    return (
      <svg
        viewBox="0 0 16 9"
        fill="none"
        ref={ref}
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
)

export default ArrowSelect

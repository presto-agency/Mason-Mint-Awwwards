import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FC,
  useEffect,
  useState,
} from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Arrow from '@/ui/Icons/Arrow'

import styles from './ButtonPrimary.module.scss'

type ButtonPrimaryVariants = 'white' | 'transparent' | 'blue' | 'noStroked'
type ButtonPrimarySizes = 'small' | 'large'

type ButtonPrimaryProps = {
  className?: string
  variant?: ButtonPrimaryVariants
  size?: ButtonPrimarySizes
  fullWidth?: boolean
  href?: string
  arrows?: boolean
  backwardArrows?: boolean
  isLoading?: boolean
  isLoadingTitle?: string
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const ButtonPrimary: FC<ButtonPrimaryProps> = ({
  className,
  children,
  variant = 'white',
  size = 'large',
  disabled,
  fullWidth = false,
  href,
  arrows = true,
  backwardArrows = false,
  isLoading = false,
  isLoadingTitle = 'wait...',
  ...buttonProps
}) => {
  const [arrowVisible, setArrowVisible] = useState(arrows)
  useEffect(() => {
    if (isLoading) {
      setArrowVisible(false)
    } else if (!isLoading && !arrows) {
      setArrowVisible(false)
    } else if (!isLoading) {
      setArrowVisible(true)
    }
  }, [isLoading, arrows])

  const mods = {
    [styles[variant]]: true,
    [styles[size]]: size === 'small',
    [styles['noArrowsAnimation']]: !arrowVisible,
    [styles['backwardArrows']]: backwardArrows,
  }

  const ButtonInner = (
    <div className={styles['buttonPrimary__content']}>
      {arrowVisible && (
        <Arrow
          className={classNames(
            styles['buttonPrimary__content_icon'],
            styles['__1']
          )}
        />
      )}
      <span>{isLoading ? isLoadingTitle : children}</span>
      {arrowVisible && (
        <Arrow
          className={classNames(
            styles['buttonPrimary__content_icon'],
            styles['__2']
          )}
        />
      )}
    </div>
  )

  return (
    <>
      {!href ? (
        <button
          className={classNames(
            styles['buttonPrimary'],
            mods,
            fullWidth ? styles['fullWidth'] : '',
            isLoading ? styles['disabled'] : '',
            className
          )}
          disabled={disabled}
          {...buttonProps}
        >
          {ButtonInner}
        </button>
      ) : (
        <Link
          scroll={false}
          href={href}
          className={classNames(
            styles['buttonPrimary'],
            mods,
            disabled || isLoading ? styles['disabled'] : '',
            fullWidth ? styles['fullWidth'] : '',
            className
          )}
        >
          {ButtonInner}
        </Link>
      )}
    </>
  )
}

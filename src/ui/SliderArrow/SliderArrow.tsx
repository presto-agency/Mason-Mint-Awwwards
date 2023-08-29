import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './SliderArrow.module.scss'

type SwiperArrowProps = {
  type?: 'next' | 'prev'
  className?: string
  disabled?: boolean
}

const SliderArrow: FC<SwiperArrowProps> = ({
  type = 'next',
  className,
  disabled = false,
}) => {
  const mods = {
    [styles['arrow_prev']]: type === 'prev',
    [styles['arrow_next']]: type === 'next',
  }
  return (
    <button
      disabled={disabled}
      className={classNames(styles['arrow'], className, mods)}
    ></button>
  )
}

export default SliderArrow

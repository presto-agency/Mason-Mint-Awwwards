import { FC, useRef, useEffect } from 'react'
import classNames from 'classnames'

import styles from './Clock.module.scss'

const Clock: FC<{ className?: string }> = ({ className }) => {
  const secondHandle = useRef<HTMLDivElement | null>(null)
  const minuteHandle = useRef<HTMLDivElement | null>(null)
  const hourHandle = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      const ss = date.getSeconds()
      const mm = date.getMinutes()
      const hh = date.getHours()
      if (secondHandle.current && minuteHandle.current && hourHandle.current) {
        secondHandle.current.style.transform = `rotateZ(${ss * 6}deg)`
        minuteHandle.current.style.transform = `rotateZ(${mm * 6}deg)`
        hourHandle.current.style.transform = `rotateZ(${hh * 30}deg)`
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className={classNames(styles['clock'], className)}>
      <svg
        viewBox="0 0 112 112"
        fill="none"
        className={styles['clock__border']}
      >
        <circle
          cx="56"
          cy="56"
          r="55"
          fill="transparent"
          stroke="currentColor"
          strokeLinecap="round"
          strokeDasharray="3 8"
        />
      </svg>
      <div className={styles['clock__hor']} id="hor" ref={hourHandle}>
        <div className={styles['clock__hor_item']}></div>
      </div>
      <div className={styles['clock__min']} id="min" ref={minuteHandle}>
        <div className={styles['clock__min_item']}></div>
      </div>
      <div className={styles['clock__sec']} id="sec" ref={secondHandle}>
        <div className={styles['clock__sec_item']}></div>
      </div>
    </div>
  )
}

export default Clock

import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Store } from '@/utils/Store'

import styles from './CustomCursor.module.scss'

const CustomCursor = () => {
  const [isOnSubject, setIsOnSubject] = useState(false)
  const { route } = useRouter()
  const mainCursor = useRef<HTMLDivElement>(null)
  const store = useContext(Store)

  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  })

  const cursorVariant = {
    default: {
      width: '12rem',
      height: '12rem',
      opacity: 1,
    },
    onSubject: {
      width: 0,
      height: 0,
      opacity: 0,
    },
  }

  useEffect(() => {
    document.addEventListener('mousemove', (event) => {
      const { clientX, clientY } = event

      if (mainCursor.current) {
        positionRef.current.mouseX =
          clientX - mainCursor.current.clientWidth / 2
        positionRef.current.mouseY =
          clientY - mainCursor.current.clientHeight / 2
      }
    })
  }, [])

  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse)
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current
      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX
        positionRef.current.destinationY = mouseY
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1
        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX
          positionRef.current.destinationY = mouseY
        } else {
          positionRef.current.destinationX += distanceX
          positionRef.current.destinationY += distanceY
        }
      }
      if (mainCursor.current) {
        mainCursor.current.style.transform = `translate3d(${destinationX}px, ${destinationY}px, 0)`
      }
    }
    followMouse()
  }, [])

  useEffect(() => {
    const handleMouseEnter = () => {
      setIsOnSubject(true)
    }

    const handleMouseLeave = () => {
      setIsOnSubject(false)
    }

    if (typeof window !== 'undefined') {
      setTimeout(() => {
        const links = document.querySelectorAll(
          'a, button, input, textarea, [data-id="select-field"]'
        )
        links.forEach((link) => {
          link.addEventListener('mouseenter', handleMouseEnter)
          link.addEventListener('mouseleave', handleMouseLeave)
        })
      }, 500)
    }
  }, [route, store?.state.modal.isOpenModal])

  return (
    <>
      <motion.div
        className={classNames(styles['customCursor'])}
        ref={mainCursor}
        variants={cursorVariant}
        animate={isOnSubject ? 'onSubject' : 'default'}
      ></motion.div>
    </>
  )
}

export default CustomCursor

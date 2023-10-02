import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { Store } from '@/utils/Store'

import Arrow from '@/ui/Icons/Arrow'

import styles from './CustomCursor.module.scss'

type ActionType = 'default' | 'drag' | 'arrow' | 'disappear'

type CustomCursorPrpops = {
  actionType?: ActionType
  setActionType?: Dispatch<SetStateAction<ActionType>>
}

const CustomCursor: FC<CustomCursorPrpops> = ({
  actionType = 'default',
  setActionType,
}) => {
  const { route } = useRouter()
  const mainCursor = useRef<HTMLDivElement>(null)

  const store = useContext(Store)

  const children: ReactNode = useMemo(() => {
    switch (actionType) {
      case 'drag':
        return 'drag'
      case 'arrow':
        return <Arrow className={styles['arrowIcon']} />
      case 'disappear':
        return undefined

      default:
        return undefined
    }
  }, [actionType])

  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
  })

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

  // useEffect(() => {
  //   const handleMouseEnter = () => {
  //     setActionType?.('disappear')
  //   }
  //   const handleMouseLeave = () => {
  //     setActionType?.('default')
  //   }
  //   if (typeof window !== 'undefined') {
  //     setTimeout(() => {
  //       const links = document.querySelectorAll(
  //         'a, button, input, textarea, [data-id="select-field"]'
  //       )
  //       links.forEach((link) => {
  //         link.addEventListener('mouseenter', handleMouseEnter)
  //         link.addEventListener('mouseleave', handleMouseLeave)
  //       })
  //     }, 500)
  //   }
  // }, [route, store?.state.modal.isOpenModal, setActionType])

  return (
    <>
      <motion.div
        className={classNames(styles['customCursor'], styles[actionType])}
        ref={mainCursor}
      >
        {children}
      </motion.div>
    </>
  )
}

export default CustomCursor

import { useRef, useEffect, FC, useContext } from 'react'
import { MotionValue, motion } from 'framer-motion'
import { useRafLoop } from 'react-use'
import { useWindowSize } from 'usehooks-ts'
import classNames from 'classnames'

import { useCursor } from '@/app/layouts/CursorLayout/CursorLayout'
import ProductCard from '@/ui/ProductCard/ProductCard'
import { ProductProps } from '@/utils/types'

import {
  MarqueCarouselContext,
  MarqueCarouselContextType,
} from './MarqueeCarouselWrapper'
import styles from './MarqueeCarousel.module.scss'

type MarqueeCarouselProps = {
  data: ProductProps[]
  className?: string
}

type MarqueeCarouselItemProps = MarqueeCarouselProps & {
  speed: MotionValue<number>
  isDragging: boolean
  id: number
}

const MarqueeCarouselItem: FC<MarqueeCarouselItemProps> = ({
  data,
  speed,
  isDragging,
  id,
}) => {
  const item = useRef<HTMLDivElement | null>(null)
  const rect = useRef<Partial<DOMRect>>({})
  const x = useRef(0)

  const { width, height } = useWindowSize()

  const setX = () => {
    if (rect.current.width) {
      if (!item.current || !rect.current) return
      const xPercentage = (x.current / rect.current.width) * 100
      if (xPercentage < -100) x.current = 0
      if (xPercentage > 0) x.current = -rect.current.width
      item.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`
    }
  }

  useEffect(() => {
    if (item.current) {
      rect.current = item.current.getBoundingClientRect()
    }
  }, [width, height])

  const loop = () => {
    x.current -= speed.get()
    setX()
  }

  useRafLoop(loop, true)

  return (
    <div className={styles['item']} ref={item}>
      {data.map((product) => {
        return (
          <ProductCard
            data={product}
            isDragging={isDragging}
            key={`${product.id}${id}`}
          />
        )
      })}
    </div>
  )
}

export const MarqueeCarousel: FC<MarqueeCarouselProps> = ({
  data,
  className,
}) => {
  const { skewX, onDragStart, onDrag, onDragEnd, speed, isDragging } =
    useContext(MarqueCarouselContext) as MarqueCarouselContextType

  const { setActionType } = useCursor()

  const handleMouseEnter = () => {
    setActionType?.('drag')
  }

  const handleMouseLeave = () => {
    setActionType?.('default')
  }

  return (
    <motion.div
      className={classNames(styles['marquee'], className)}
      style={{ skewX }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
      dragElastic={0.000001}
    >
      <MarqueeCarouselItem
        data={data}
        isDragging={isDragging}
        speed={speed}
        id={1}
      ></MarqueeCarouselItem>
      <MarqueeCarouselItem
        data={data}
        isDragging={isDragging}
        speed={speed}
        id={2}
      />
    </motion.div>
  )
}

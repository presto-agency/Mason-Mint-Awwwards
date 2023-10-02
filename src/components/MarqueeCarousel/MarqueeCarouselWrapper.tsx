import {
  FC,
  ReactNode,
  WheelEvent,
  createContext,
  useRef,
  useState,
} from 'react'
import { useRafLoop } from 'react-use'
import { MotionValue, PanInfo, useSpring, useTransform } from 'framer-motion'
import normalizeWheel from 'normalize-wheel'

export type MarqueCarouselContextType = {
  isDragging: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  skewX: MotionValue<any>
  onWheel: (e: WheelEvent<HTMLDivElement>) => void
  onDragStart: () => void
  onDrag: (e: DragEventType, info: PanInfo) => void
  onDragEnd: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  speed: MotionValue<any>
}

type DragEventType = MouseEvent | TouchEvent | PointerEvent

export const MarqueCarouselContext =
  createContext<MarqueCarouselContextType | null>(null)

type CarouselOptions = {
  speed: number
  threshold: number
  wheelFactor: number
  dragFactor: number
}

type MarqueCarouselWrapperProps = {
  children: ReactNode
}

const defaultMarqueeOptions: CarouselOptions = {
  speed: 1,
  threshold: 0.014,
  wheelFactor: 1.4,
  dragFactor: 1,
}

export const MarqueCarouselWrapper: FC<MarqueCarouselWrapperProps> = ({
  children,
}) => {
  const { speed, threshold, wheelFactor, dragFactor } = defaultMarqueeOptions
  const [isDragging, setIsDragging] = useState(false)
  const slowDown = useRef<boolean>(false)
  const isScrolling = useRef<NodeJS.Timeout>()
  const x = useRef(0)

  const _speed = useSpring(speed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  })

  const w = useRef(
    typeof window !== 'undefined' ? window.innerWidth : 0
  ).current
  const skewX = useTransform(_speed, [-w * 0.25, 0, w * 0.25], [-25, 0, 25])

  const onWheel = (e: WheelEvent<HTMLDivElement>) => {
    const normalized = normalizeWheel(e)

    x.current = normalized.pixelY * wheelFactor

    window.clearTimeout(isScrolling.current)
    isScrolling.current = setTimeout(function () {
      _speed.set(speed)
    }, 30)
  }

  const onDragStart = () => {
    setIsDragging(true)
    slowDown.current = true

    _speed.set(0)
  }

  const onDrag = (e: DragEventType, info: PanInfo) => {
    _speed.set(dragFactor * -info.delta.x)
  }

  const onDragEnd = () => {
    setIsDragging(false)
    slowDown.current = false

    x.current = speed
  }

  const loop = () => {
    if (slowDown.current || Math.abs(x.current) < threshold) return
    x.current *= 0.66
    if (x.current < 0) {
      x.current = Math.min(x.current, 0)
    } else {
      x.current = Math.max(x.current, 0)
    }
    _speed.set(speed + x.current)
  }

  useRafLoop(loop, true)

  const props = {
    onWheel: onWheel,
    onDrag: onDrag,
    onDragStart: onDragStart,
    onDragEnd: onDragEnd,
    isDragging,
    speed: _speed,
    skewX,
  }

  return (
    <MarqueCarouselContext.Provider value={props}>
      {children}
    </MarqueCarouselContext.Provider>
  )
}

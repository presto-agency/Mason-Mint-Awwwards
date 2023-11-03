import {
  FC,
  ReactNode,
  WheelEvent,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useRafLoop } from 'react-use'
import { MotionValue, PanInfo, useSpring, useTransform } from 'framer-motion'
import normalizeWheel from 'normalize-wheel'
import { useScroll } from '@/hooks/useScroll'

export type MarqueCarouselContextType = {
  isDragging: boolean
  marqueeDirection: 'left' | 'right'
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
  const [marqueeDirection, setMarqueeDirection] = useState<'left' | 'right'>(
    'left'
  )
  const slowDown = useRef<boolean>(false)
  const isScrolling = useRef<NodeJS.Timeout>()
  const x = useRef(0)
  const { scrollDirection } = useScroll()
  const _speed = useSpring(speed, {
    damping: 40,
    stiffness: 90,
    mass: 5,
  })

  const w = useRef(
    typeof window !== 'undefined' ? window.innerWidth : 0
  ).current
  const skewX = useTransform(_speed, [-w * 0.25, 0, w * 0.25], [-25, 0, 25])

  useEffect(() => {
    if (scrollDirection === 'up') {
      setMarqueeDirection('right')
    } else {
      setMarqueeDirection('left')
    }
  }, [scrollDirection])

  const onWheel = useCallback(
    (e: WheelEvent<HTMLDivElement>) => {
      const normalized = normalizeWheel(e)

      x.current = normalized.pixelY * wheelFactor

      window.clearTimeout(isScrolling.current)
      isScrolling.current = setTimeout(function () {
        _speed.set(speed)
      }, 30)
    },
    [_speed, speed, wheelFactor]
  )

  const onDragStart = useCallback(() => {
    setIsDragging(true)
    slowDown.current = true

    _speed.set(0)
  }, [_speed])

  const onDrag = useCallback(
    (e: DragEventType, info: PanInfo) => {
      if (marqueeDirection === 'left') {
        _speed.set(dragFactor * -info.delta.x * 2)
      } else {
        _speed.set(dragFactor * info.delta.x * 2)
      }
    },
    [_speed, dragFactor, marqueeDirection]
  )

  const onDragEnd = useCallback(() => {
    setIsDragging(false)
    slowDown.current = false

    x.current = speed
  }, [speed])

  const loop = useCallback(() => {
    if (slowDown.current || Math.abs(x.current) < threshold) return
    x.current *= 0.66
    if (x.current < 0) {
      x.current = Math.min(x.current, 0)
    } else {
      x.current = Math.max(x.current, 0)
    }

    if (marqueeDirection === 'left') {
      _speed.set(speed - x.current)
    } else {
      _speed.set(speed + x.current)
    }
  }, [_speed, speed, threshold, scrollDirection])

  useRafLoop(loop, true)

  const props = useMemo(() => {
    return {
      onWheel: onWheel,
      onDrag: onDrag,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
      isDragging,
      speed: _speed,
      marqueeDirection,
      skewX,
    }
  }, [
    _speed,
    skewX,
    onDragEnd,
    onDragStart,
    onDrag,
    onWheel,
    isDragging,
    marqueeDirection,
  ])

  return (
    <MarqueCarouselContext.Provider value={props}>
      {children}
    </MarqueCarouselContext.Provider>
  )
}

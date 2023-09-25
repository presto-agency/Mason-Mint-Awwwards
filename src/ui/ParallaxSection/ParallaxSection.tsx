import React, {
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import useWindowDimensions from '@/hooks/useWindowDimensions'

type ParallaxSection = {
  children?: ReactNode
  parallaxValues?: [number, number]
  className?: string
}

const ParallaxSection: FC<ParallaxSection> = ({
  children,
  parallaxValues = [0, 150],
  className,
}) => {
  const useParallax = (value: MotionValue<number>) => {
    return useTransform(value, [0, 1], parallaxValues)
  }
  const { width } = useWindowDimensions()

  const refTarget = useRef(null)

  const { scrollYProgress } = useScroll({
    target: refTarget,
    offset: ['start end', 'end start'],
  })
  const y = useParallax(scrollYProgress)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const style = useMemo(() => {
    return { y: isMounted && width <= 991 ? 0 : y }
  }, [y, width, isMounted])

  // useEffect(() => {
  //   console.log(style)
  // }, [style])

  return (
    <>
      <motion.div ref={refTarget} className={className} style={style}>
        {children}
      </motion.div>
    </>
  )
}

export default ParallaxSection

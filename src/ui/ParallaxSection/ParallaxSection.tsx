import React, { FC, ReactNode, useMemo, useRef } from 'react'
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
  const { width } = useWindowDimensions()
  const useParallax = (value: MotionValue<number>) => {
    return useTransform(value, [0, 1], width > 991 ? parallaxValues : [0, 0])
  }

  const refTarget = useRef(null)

  const { scrollYProgress } = useScroll({
    target: refTarget,
    offset: ['start end', 'end start'],
  })
  const y = useParallax(scrollYProgress)

  const style = useMemo(() => {
    return { y: y }
  }, [y])

  return (
    <>
      <motion.div ref={refTarget} className={className} style={style}>
        {children}
      </motion.div>
    </>
  )
}

export default ParallaxSection

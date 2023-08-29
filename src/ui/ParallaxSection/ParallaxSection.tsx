import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
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
  return (
    <>
      {isMounted && width <= 991 ? (
        <div className={className}>{children}</div>
      ) : (
        <motion.div
          ref={refTarget}
          className={className}
          style={{
            y,
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}

export default ParallaxSection

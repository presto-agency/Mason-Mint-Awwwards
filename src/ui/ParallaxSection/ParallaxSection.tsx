import React, { FC, ReactNode, useMemo, useRef } from 'react'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import useWindowDimensions from '@/hooks/useWindowDimensions'
import {off} from "react-use/lib/misc/util";

type offsetVariant = 'start start'
  | 'start center'
  | 'start end'
  | 'center start'
  | 'center center'
  | 'center end'
  | 'end start'
  | 'end center'
  | 'end end'

type ParallaxSection = {
  children?: ReactNode
  parallaxValues?: [number, number]
  className?: string,
  offset?: [offsetVariant, offsetVariant]
}

const ParallaxSection: FC<ParallaxSection> = ({
  children,
  parallaxValues = [0, 150],
  className,
  offset = ['start end', 'end start']
}) => {
  const { width } = useWindowDimensions()
  const useParallax = (value: MotionValue<number>) => {
    return useTransform(value, [0, 1], width > 991 ? parallaxValues : [0, 0])
  }

  const refTarget = useRef(null)

  const { scrollYProgress } = useScroll({
    target: refTarget,
    offset: offset,
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

import { FC, useMemo } from 'react'
import { Transition, motion } from 'framer-motion'

type BackgroundOverlayProps = {
  className?: string
  showMobileFilter: boolean
}

const transition: Transition = { duration: 0.2, ease: 'easeInOut' }

const BackgroundOverlay: FC<BackgroundOverlayProps> = ({
  className,
  showMobileFilter,
}) => {
  const style = useMemo(() => {
    return {
      opacity: showMobileFilter ? 1 : 0,
      zIndex: showMobileFilter ? 1 : 0,
    }
  }, [showMobileFilter])

  return (
    <motion.div
      style={style}
      transition={transition}
      className={className}
    ></motion.div>
  )
}

export default BackgroundOverlay

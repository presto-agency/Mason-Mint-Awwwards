import React, { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import { motion, useInView } from 'framer-motion'

import styles from './VideoComponent.module.scss'

type VideoComponent = {
  className?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  src: string
  poster?: string
  controls?: boolean
}
const VideoComponent: FC<VideoComponent> = ({
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  src = '/video/hero_video_bg-compress.mp4',
  poster,
  controls = false,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const inView = useInView(videoRef)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const playVideo = async () => {
      try {
        if (videoRef.current && inView) {
          await videoRef.current.play()
        }

        if (videoRef?.current && videoRef.current.paused) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
      } catch (error) {}
    }

    playVideo()
  }, [inView])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 1 }}
      className={styles['video']}
    >
      <video
        className={classNames(styles['video__item'], className)}
        playsInline
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        poster={poster}
        ref={videoRef}
        controls={controls}
      >
        <source src={src} type="video/mp4" />
      </video>
    </motion.div>
  )
}

export default VideoComponent

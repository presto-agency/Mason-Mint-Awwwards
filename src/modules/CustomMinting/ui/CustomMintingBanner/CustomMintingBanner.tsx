import { FC, useState } from 'react'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { BackgroundImage } from '@/ui/BackgroundImage/BackgroundImage'
import useWindowDimensions from '@/hooks/useWindowDimensions'

import styles from './CustomMintingBanner.module.scss'

const CustomMintingBanner: FC<{ className?: string }> = ({ className }) => {
  const [loaded, setLoaded] = useState<boolean>(false)
  const { width } = useWindowDimensions()

  return (
    <div className={classNames(styles['banner'], className)}>
      <motion.div
        className={styles['banner__overflow']}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <BackgroundImage
          src="/images/custom-minting/hero-banner.jpg"
          alt="Let Us Make Your Vision a Reality."
          className={styles['banner__item']}
          parallax
          parallaxValues={width > 767 ? [-150, 150] : [-100, 100]}
          onLoadingComplete={() => setLoaded(true)}
        />
      </motion.div>
    </div>
  )
}

export default CustomMintingBanner

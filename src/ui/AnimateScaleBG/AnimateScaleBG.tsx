import React, { FC, Fragment, useRef } from 'react'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'

import 'swiper/css'
import 'swiper/css/effect-fade'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from '@/modules/Home/ui/CustomDesignsSection/CustomDesignsSection.module.scss'
import classNames from 'classnames'
import Image from 'next/image'

const AnimateScaleBg: FC<{ images: string[] }> = ({ images }) => {
  const options = {
    type: 'fade',
    autoWidth: false,
    perMove: 1,
    perPage: 1,
    pagination: false,
    arrows: false,
    updateOnMove: true,
    speed: 2000,
    easing: 'ease',
    autoplay: true,
    interval: 5000,
    pauseOnFocus: false,
    pauseOnHover: false,
    rewind: true,
  }

  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 500])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.div
      ref={targetRef}
      className={styles['CustomDesignsSection__overlay']}
      style={{ y, opacity }}
    >
      <Splide
        className={classNames(
          styles['CustomDesignsSection__carousel'],
          'scale-carousel'
        )}
        options={options}
        hasTrack={false}
      >
        <SplideTrack className={styles['CustomDesignsSection__carousel_track']}>
          {images.length > 0
            ? images.map((image, index) => (
                <Fragment key={index}>
                  <SplideSlide
                    className={styles['CustomDesignsSection__carousel_slide']}
                  >
                    <Image
                      src={image}
                      alt="Custom Minting Program"
                      fill={true}
                      className={styles['CustomDesignsSection__carousel_image']}
                    />
                  </SplideSlide>
                </Fragment>
              ))
            : null}
        </SplideTrack>
      </Splide>
    </motion.div>
  )
}

export default AnimateScaleBg

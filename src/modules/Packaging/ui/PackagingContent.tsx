import React, { FC, useContext, useRef } from 'react'
import dynamic from 'next/dynamic'
import { useScroll } from 'framer-motion'
import {
  MarqueCarouselContext,
  MarqueCarouselContextType,
} from '@/components/MarqueeCarousel/MarqueeCarouselWrapper'

import HeroInner from '@/ui/HeroInner/HeroInner'
import WhatWeDo from '@/components/WhatWeDo/WhatWeDo'
import NaturalVehicle from '@/modules/Packaging/ui/NaturalVehicle/NaturalVehicle'
import NumismaticPackaging from '@/modules/Packaging/ui/NumismaticPackaging/NumismaticPackaging'
const HeroDetail = dynamic(() => import('@/ui/HeroDetail/HeroDetail'), {
  ssr: false,
})

const BecomeDistributorSection = dynamic(
  () =>
    import('@/components/BecomeDistributorSection/BecomeDistributorSection'),
  { ssr: false }
)

import styles from './PackagingContent.module.scss'

const sliderImages = ['/images/packaging/hero.jpg']

const HeroSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  return (
    <div ref={targetRef}>
      <HeroInner
        title="Creation of custom packaging always starts with the coin"
        subtitle="Packaging"
        description="Your options are limitless for creating the perfect packaging to match your minted silver products."
        centeredOnDesktop
        width="90%"
      />
      <HeroDetail
        sliderImages={sliderImages}
        image="/images/packaging/hero.jpg"
        className={styles['HeroInner']}
        scrollYProgress={scrollYProgress}
      />
    </div>
  )
}

export const PackagingContent: FC = () => {
  const { onWheel } = useContext(
    MarqueCarouselContext
  ) as MarqueCarouselContextType

  return (
    <main className={styles['PackagingContent']} onWheel={onWheel}>
      <HeroSection />
      <NaturalVehicle />
      <NumismaticPackaging />
      <WhatWeDo />
      <BecomeDistributorSection />
    </main>
  )
}

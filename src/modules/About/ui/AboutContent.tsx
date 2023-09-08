import React, { FC, useRef } from 'react'
import dynamic from 'next/dynamic'
import HeroInner from '@/ui/HeroInner/HeroInner'
import WasBorn from '@/modules/About/ui/WasBorn/WasBorn'
import AllProducts from '@/modules/About/ui/AllProducts/AllProducts'
import WhatWeDo from '@/components/WhatWeDo/WhatWeDo'
import { useScroll } from 'framer-motion'

const BecomeDistributorSection = dynamic(
  () =>
    import('@/components/BecomeDistributorSection/BecomeDistributorSection'),
  { ssr: false }
)

const HeroDetail = dynamic(() => import('@/ui/HeroDetail/HeroDetail'), {
  ssr: false,
})

const sliderImages = ['/images/about/innerAbout-desktop.jpg']

const HeroSection = () => {
  const targetRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })
  return (
    <div ref={targetRef}>
      <HeroInner
        title="Finding a partner you can trust is not an easy decision"
        subtitle="Welcome to masonmint"
        centeredOnDesktop
      />
      <HeroDetail
        sliderImages={sliderImages}
        image="/images/about/innerAbout_1.jpg"
        topDescription="We've built our business on our high standard for excellency with industry leading pricing."
        bottomDescription="Providing our distribution partners with some of the highest quality silver bullion coins and bars at a price point that is second to none."
        scrollYProgress={scrollYProgress}
      />
    </div>
  )
}

export const AboutContent: FC = () => {
  return (
    <main>
      <HeroSection />
      <WasBorn />
      <AllProducts />
      <WhatWeDo />
      <BecomeDistributorSection />
    </main>
  )
}

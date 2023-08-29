import React, { FC } from 'react'
import HeroInner from '@/ui/HeroInner/HeroInner'
import WasBorn from '@/modules/About/ui/WasBorn/WasBorn'
import AllProducts from '@/modules/About/ui/AllProducts/AllProducts'
import BecomeDistributorSection from '@/components/BecomeDistributorSection/BecomeDistributorSection'
import WhatWeDo from '@/components/WhatWeDo/WhatWeDo'
import dynamic from 'next/dynamic'
const HeroDetail = dynamic(() => import('@/ui/HeroDetail/HeroDetail'), {
  ssr: false,
})

const sliderImages = ['/images/about/innerAbout-desktop.jpg']

import styles from './AboutContent.module.scss'

export const AboutContent: FC = () => {
  return (
    <main className={styles.AboutContent}>
      <HeroInner
        title="Finding a partner you can trust is not an easy decision"
        subtitle="Welcome to masonmint"
        columns={10}
      />
      <HeroDetail
        sliderImages={sliderImages}
        image="/images/about/innerAbout_1.jpg"
        topDescription="We've built our business on our high standard for excellency with industry leading pricing."
        bottomDescription="Providing our distribution partners with some of the highest quality silver bullion coins and bars at a price point that is second to none."
      />
      <WasBorn />
      <AllProducts />
      <WhatWeDo />
      <BecomeDistributorSection />
    </main>
  )
}

import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import HeroInner from '@/ui/HeroInner/HeroInner'
import WasBorn from '@/modules/About/ui/WasBorn/WasBorn'
import AllProducts from '@/modules/About/ui/AllProducts/AllProducts'
import WhatWeDo from '@/components/WhatWeDo/WhatWeDo'

const BecomeDistributorSection = dynamic(
  () =>
    import('@/components/BecomeDistributorSection/BecomeDistributorSection'),
  { ssr: false }
)

const HeroDetail = dynamic(() => import('@/ui/HeroDetail/HeroDetail'), {
  ssr: false,
})

const sliderImages = ['/images/about/innerAbout-desktop.jpg']

export const AboutContent: FC = () => {
  return (
    <main>
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

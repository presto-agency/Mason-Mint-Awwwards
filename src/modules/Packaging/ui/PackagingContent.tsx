import React, { FC } from 'react'
import dynamic from 'next/dynamic'
import HeroInner from '@/ui/HeroInner/HeroInner'
import WhatWeDo from '@/components/WhatWeDo/WhatWeDo'
import BecomeDistributorSection from '@/components/BecomeDistributorSection/BecomeDistributorSection'
import NaturalVehicle from '@/modules/Packaging/ui/NaturalVehicle/NaturalVehicle'
import NumismaticPackaging from '@/modules/Packaging/ui/NumismaticPackaging/NumismaticPackaging'
const HeroDetail = dynamic(() => import('@/ui/HeroDetail/HeroDetail'), {
  ssr: false,
})

import styles from './PackagingContent.module.scss'

const sliderImages = ['/images/packaging/hero.jpg']

export const PackagingContent: FC = () => {
  return (
    <main className={styles['PackagingContent']}>
      <HeroInner
        title="Creation of custom packaging always starts with the coin"
        subtitle="Packaging"
        description="Your options are limitless for creating the perfect packaging to match your minted silver products."
        columns={9}
      />
      <HeroDetail
        sliderImages={sliderImages}
        image="/images/packaging/hero.jpg"
        className={styles['HeroInner']}
      />
      <NaturalVehicle />
      <NumismaticPackaging />
      <WhatWeDo />
      <BecomeDistributorSection />
    </main>
  )
}

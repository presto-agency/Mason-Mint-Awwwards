import { CSSProperties, useMemo, useRef } from 'react'
import { useInView } from 'framer-motion'
import dynamic from 'next/dynamic'
import useWindowDimensions from '@/hooks/useWindowDimensions'

import IntroSection from './IntroSection/IntroSection'
import StorySection from './StorySection/StorySection'
import { DiscoverMasonMintSection } from './DisocoverMasonMintSection/DiscoverMasonMintSection'

import FAQSection from './FAQSection/FAQSection'
import SellSection from './SellSection/SellSection'

const FeaturedDesignsSection = dynamic(
  () => import('./FeaturedDesignsSection/FeaturedDesignsSection'),
  { ssr: false }
)
const ExploreDesignsSection = dynamic(
  () => import('./ExploreDesignsSection/ExploreDesignsSection'),
  { ssr: false }
)
const CustomDesignsSection = dynamic(
  () => import('./CustomDesignsSection/CustomDesignsSection'),
  { ssr: false }
)
const BecomeDistributorSection = dynamic(
  () =>
    import('@/components/BecomeDistributorSection/BecomeDistributorSection'),
  { ssr: false }
)

import ParallaxSection from '@/ui/ParallaxSection/ParallaxSection'

import styles from './HomeContent.module.scss'

const HomeContent = () => {
  const { width } = useWindowDimensions()
  const exploreDesignsSectionRef = useRef<HTMLDivElement | null>(null)
  const inView = useInView(exploreDesignsSectionRef, {
    margin: width > 768 ? '100px' : '400px',
  })

  const style: CSSProperties = useMemo(() => {
    return { position: inView ? 'sticky' : 'relative' }
  }, [inView])

  return (
    <main className={styles['HomeContent']}>
      <ParallaxSection parallaxValues={[-400, 400]}>
        <IntroSection />
      </ParallaxSection>
      <ParallaxSection
        parallaxValues={[10, 20]}
        className={styles['storyWrapper']}
      >
        <StorySection />
      </ParallaxSection>
      <div style={style} className={styles['discoverMasonMintWrapper']}>
        <DiscoverMasonMintSection />
      </div>
      <div ref={exploreDesignsSectionRef}>
        <ExploreDesignsSection />
      </div>
      <FeaturedDesignsSection />
      <CustomDesignsSection />
      <SellSection />
      <FAQSection />
      <BecomeDistributorSection />
    </main>
  )
}

export default HomeContent

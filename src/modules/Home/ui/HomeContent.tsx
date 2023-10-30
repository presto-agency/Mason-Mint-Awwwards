import { FC, useContext } from 'react'
import dynamic from 'next/dynamic'

import IntroSection from './IntroSection/IntroSection'
import StorySection from './StorySection/StorySection'
import { DiscoverMasonMintSection } from '@/components/DisocoverMasonMintSection/DiscoverMasonMintSection'

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
import { ProductProps } from '@/utils/types'
import {
  MarqueCarouselContext,
  MarqueCarouselContextType,
} from '@/components/MarqueeCarousel/MarqueeCarouselWrapper'

type HomeContentProps = {
  products: ProductProps[]
}

const HomeContent: FC<HomeContentProps> = ({ products }) => {
  const { onWheel } = useContext(
    MarqueCarouselContext
  ) as MarqueCarouselContextType

  return (
    <main className={styles['HomeContent']} onWheel={onWheel}>
      <ParallaxSection parallaxValues={[-400, 400]}>
        <IntroSection />
      </ParallaxSection>
      <ParallaxSection
        parallaxValues={[10, 20]}
        className={styles['storyWrapper']}
      >
        <StorySection />
      </ParallaxSection>
      <ParallaxSection
        offset={['end end', 'end start']}
        parallaxValues={[0, 400]}
      >
        <div className={styles['discoverMasonMintWrapper']}>
          <DiscoverMasonMintSection />
        </div>
      </ParallaxSection>
      <ExploreDesignsSection />
      {products.length > 0 && <FeaturedDesignsSection products={products} />}
      <CustomDesignsSection />
      <SellSection />
      <FAQSection />
      <BecomeDistributorSection />
    </main>
  )
}

export default HomeContent

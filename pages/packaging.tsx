import Head from 'next/head'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'
import { PackagingContent } from '@/modules/Packaging'
import { MarqueCarouselWrapper } from '@/components/MarqueeCarousel/MarqueeCarouselWrapper'

const CustomMintingPage = () => {
  return (
    <>
      <Head>
        <title>Packaging | Mason Mint</title>
      </Head>
      <PageTransitionLayout>
        <MarqueCarouselWrapper>
          <PackagingContent />
        </MarqueCarouselWrapper>
      </PageTransitionLayout>
    </>
  )
}

export default CustomMintingPage

export const getStaticProps = () => {
  return {
    props: {},
  }
}

import Head from 'next/head'
import { PackagingContent } from '@/modules/Packaging'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'

const CustomMintingPage = () => {
  return (
    <>
      <Head>
        <title>Packaging | Mason Mint</title>
      </Head>
      <PageTransitionLayout>
        <PackagingContent />
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

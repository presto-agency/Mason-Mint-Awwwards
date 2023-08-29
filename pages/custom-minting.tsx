import Head from 'next/head'
import { CustomMintingContent } from '@/modules/CustomMinting'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'

const CustomMintingPage = () => {
  return (
    <>
      <Head>
        <title>Custom Minting | Mason Mint</title>
      </Head>
      <PageTransitionLayout>
        <CustomMintingContent />
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

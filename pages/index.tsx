import Head from 'next/head'
import { HomeContent } from '@/modules/Home'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'

export default function Home() {
  return (
    <>
      <Head>
        <title>Mason Mint Silver Coins and Rounds</title>
      </Head>
      <PageTransitionLayout>
        <HomeContent />
      </PageTransitionLayout>
    </>
  )
}

export const getStaticProps = () => {
  return {
    props: {},
  }
}

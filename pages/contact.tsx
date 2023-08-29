import Head from 'next/head'
import { ContactContent } from '@/modules/Contact'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact Us | Mason Mint</title>
        <meta
          name="description"
          content="Have a question? Send us and email and one of our knowledgeable customer service representatives will respond within 24 business hours."
        />
      </Head>
      <PageTransitionLayout>
        <ContactContent />
      </PageTransitionLayout>
    </>
  )
}

export const getStaticProps = () => {
  return {
    props: {},
  }
}

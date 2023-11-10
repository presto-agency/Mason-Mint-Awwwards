import { FC, ReactNode, useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { withModal } from '@/context/modal'
import { Lenis as ReactLenis } from '@studio-freight/react-lenis'

import { Header } from '@/components/Header'
import CursorLayout from '../CursorLayout/CursorLayout'
import { Footer } from '@/components/Footer/Footer'

type AppLayoutProps = {
  children: ReactNode
}

const AppLayout: FC<AppLayoutProps> = ({ children }) => {
  const [headerTheme, setHeaderTheme] = useState<'light' | 'dark'>('light')
  const [existHeaderFooter, setExistHeaderFooter] = useState<boolean>(true)

  const { route } = useRouter()

  const options = {
    duration: 1.5,
    smoothWheel: true,
    // smoothTouch: true,
  }

  useEffect(() => {
    const forDarkHeader = ['/']
    const withoutHeaderFooter = ['/404']
    // Change theme
    if (forDarkHeader.includes(route)) {
      setHeaderTheme('dark')
    } else if (headerTheme !== 'light') {
      setHeaderTheme('light')
    }
    // Hide Header & Footer
    if (withoutHeaderFooter.includes(route)) {
      setExistHeaderFooter(false)
    } else if (!existHeaderFooter) {
      setExistHeaderFooter(true)
    }
  }, [route, headerTheme, existHeaderFooter])

  return (
    <>
      <Head>
        <meta
          name="description"
          content="Mason Mint supplying both investors and collector with high quality silver products."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1"
        />
      </Head>
      <ReactLenis root options={{ ...options }}>
        <CursorLayout>
          {existHeaderFooter && <Header theme={headerTheme} />}
          {children}
          {existHeaderFooter && <Footer />}
        </CursorLayout>
      </ReactLenis>
    </>
  )
}

export default withModal(AppLayout)

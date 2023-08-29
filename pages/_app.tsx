import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { AnimatePresence } from 'framer-motion'
import { StoreProvider } from '@/utils/Store'
import AppLayout from '@/app/layouts/AppLayout'
import { useNextCssRemovalPrevention } from '@madeinhaus/nextjs-page-transition'
import MainPreloaderWrapper from '@/components/MainPreloader/MainPreloaderWrapper'
import { useRouter } from 'next/router'
import localFont from 'next/font/local'

import 'bootstrap/scss/bootstrap-grid.scss'
import '@/app/styles/index.scss'

const gambetta = localFont({
  src: [
    {
      path: '../public/fonts/Gambetta-Light.woff2',
      weight: '300',
    },
    {
      path: '../public/fonts/Gambetta-Regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/Gambetta-Medium.woff2',
      weight: '500',
    },
    {
      path: '../public/fonts/Gambetta-Light.woff',
      weight: '300',
    },
    {
      path: '../public/fonts/Gambetta-Regular.woff',
      weight: '400',
    },
    {
      path: '../public/fonts/Gambetta-Medium.woff',
      weight: '500',
    },
  ],
})

const suisseIntl = localFont({
  src: [
    {
      path: '../public/fonts/SuisseIntl-Regular.woff2',
      weight: '400',
    },
    {
      path: '../public/fonts/SuisseIntl-Regular.woff',
      weight: '400',
    },
  ],
})

export default function App({ Component, pageProps }: AppProps) {
  const onExitComplete = () => {
    window.scrollTo({ top: 0 })
  }

  useNextCssRemovalPrevention()
  const router = useRouter()
  const pageKey = router.asPath

  return (
    <>
      <style jsx global>{`
        :root {
          --font-family-primary: ${gambetta.style.fontFamily};
          --font-family-secondary: ${suisseIntl.style.fontFamily};
        }
      `}</style>
      <StoreProvider>
        <AppLayout>
          <NextNProgress color="#266ef9" />
          <MainPreloaderWrapper />
          <AnimatePresence onExitComplete={onExitComplete} mode="wait">
            <Component {...pageProps} key={pageKey} />
          </AnimatePresence>
        </AppLayout>
      </StoreProvider>
    </>
  )
}

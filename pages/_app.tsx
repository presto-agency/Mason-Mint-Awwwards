import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'
import NextNProgress from 'nextjs-progressbar'
import { AnimatePresence, motion } from 'framer-motion'
import { StoreProvider } from '@/utils/Store'
import AppLayout from '@/app/layouts/AppLayout'
import { useNextCssRemovalPrevention } from '@madeinhaus/nextjs-page-transition'
import MainPreloaderWrapper from '@/components/MainPreloader/MainPreloaderWrapper'
import localFont from 'next/font/local'

import 'bootstrap/scss/bootstrap-grid.scss'
import '@/app/styles/index.scss'
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

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

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const onExitComplete = () => {
    history.scrollRestoration = 'manual'
    window.scrollTo({ top: 0 })
  }

  const [queryClient] = useState(() => new QueryClient())

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
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
          <SessionProvider session={session}>
            <StoreProvider>
              <AppLayout>
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      fontSize: '16rem',
                      lineHeight: '24rem',
                      fontWeight: '400',
                      fontFamily: 'var(--font-family-secondary)',
                    },
                    iconTheme: {
                      primary: '#21D184',
                      secondary: '#FFF',
                    },
                  }}
                />
                <NextNProgress color="#266ef9" />
                <div id="portal"></div>
                <MainPreloaderWrapper />
                <AnimatePresence onExitComplete={onExitComplete} mode="wait">
                  {/*<motion.div key={router.pathname}>*/}
                  <Component {...pageProps} key={pageKey} />
                  {/*</motion.div>*/}
                </AnimatePresence>
              </AppLayout>
            </StoreProvider>
          </SessionProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

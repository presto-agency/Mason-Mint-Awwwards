import PageNotFound from '@/modules/PageNotFound/PageNotFound'
import PageTransitionLayout from '../src/app/layouts/PageTransitionLayout'

export default function Custom404() {
  return (
    <PageTransitionLayout hasFooter={false}>
      <PageNotFound />
    </PageTransitionLayout>
  )
}

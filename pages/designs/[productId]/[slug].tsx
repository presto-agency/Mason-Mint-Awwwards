import { DesignsDetailContent } from '@/modules/DesignsDetail'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'
import { useRouter } from 'next/router'

const Index = () => {
  return (
    <PageTransitionLayout>
      <DesignsDetailContent />
    </PageTransitionLayout>
  )
}

export default Index

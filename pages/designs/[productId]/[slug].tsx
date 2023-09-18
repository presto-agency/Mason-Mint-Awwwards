// import { DesignsDetailContent } from '@/modules/DesignsDetailOld'
import PageTransitionLayout from '@/app/layouts/PageTransitionLayout'
import { DesignsDetailContent } from '@/modules/DesignDetail'
import { useRouter } from 'next/router'

const Index = () => {
  return (
    <PageTransitionLayout>
      <DesignsDetailContent />
    </PageTransitionLayout>
  )
}

export default Index

import Container from '@/app/layouts/Container'
import BecomeADistributorForm from '@/modules/BecomeADistributor/ui/BecomeADistributorForm/BecomeADistributorForm'
import BecomeADistributorBody from '@/modules/BecomeADistributor/ui/BecomeADistributorBody/BecomeADistributorBody'
import HeroInner from '@/ui/HeroInner/HeroInner'

import styles from './BecomeADistributorContent.module.scss'

export const BecomeADistributorContent = () => {
  return (
    <main className={styles['becomeADistributorContent']}>
      <HeroInner
        title="Become an authorized distributor"
        subtitle="wholesale & distribution"
        description="Complete the application below & one of our customer service representatives will contact you with more information regarding our products."
        theme="gray"
      />
      <div className={styles['becomeADistributorContent__content']}>
        <Container>
          <div className="row">
            <div className="col-md-6 order-md-2">
              <BecomeADistributorForm />
            </div>
            <div className="col-md-5 order-md-1">
              <BecomeADistributorBody />
            </div>
          </div>
        </Container>
      </div>
    </main>
  )
}

import Container from '@/app/layouts/Container'
import ContactForm from '@/modules/Contact/ui/ContactForm/ContactForm'
import ContactBody from '@/modules/Contact/ui/ContactBody/ContactBody'

const BecomeDistributorSection = dynamic(
  () =>
    import('@/components/BecomeDistributorSection/BecomeDistributorSection'),
  { ssr: false }
)
import styles from './ContactContent.module.scss'
import dynamic from 'next/dynamic'

export const ContactContent = () => {
  return (
    <main className={styles['contactContent']}>
      <Container>
        <div className="row">
          <div className="col-md-6 offset-md-1 order-md-2">
            <ContactForm className={styles['contactContent__form']} />
          </div>
          <div className="col-md-4 order-md-1">
            <ContactBody className={styles['contactContent__body']} />
          </div>
        </div>
      </Container>
      <BecomeDistributorSection />
    </main>
  )
}

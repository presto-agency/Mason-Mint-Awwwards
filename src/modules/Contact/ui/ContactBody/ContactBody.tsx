import { FC } from 'react'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import ContactInfo from '@/ui/ContactInfo/ContactInfo'
import Clock from '@/ui/Clock/Clock'
import AnimatedElement from '@/ui/AnimatedElement/AnimatedElement'
const AnimatedText = dynamic(() => import('@/ui/AnimatedText/AnimatedText'))

import styles from './ContactBody.module.scss'

const ContactBody: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={classNames(styles['contactBody'], className)}>
      <div className="d-none d-md-block">
        <h1 className={classNames('h1', styles['contactBody__title'])}>
          <AnimatedText title withBlueDot>{`Let's talk`}</AnimatedText>
        </h1>
        <p className={styles['contactBody__contacts_title']}>
          <AnimatedText>Stay in touch with us:</AnimatedText>
        </p>
        <ContactInfo className={styles['contactBody__contacts']} />
      </div>
      <AnimatedElement delay={0.3} className={styles['contactBody__clock_box']}>
        <Clock className={styles['contactBody__clock']} />
      </AnimatedElement>
      {/*<p className={styles['contactBody__address_title']}>*/}
      {/*  <AnimatedText>US Legal Address</AnimatedText>*/}
      {/*</p>*/}
      {/*<p className={styles['contactBody__address']}>*/}
      {/*  <AnimatedText>470 Ramona St Palo Alto, 943 01, CA</AnimatedText>*/}
      {/*</p>*/}
    </div>
  )
}

export default ContactBody

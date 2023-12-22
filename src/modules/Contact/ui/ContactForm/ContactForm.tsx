import { FC, useRef, useState } from 'react'
import classNames from 'classnames'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import dynamic from 'next/dynamic'
import TextField from '@/ui/TextField/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '@/modules/Contact/ui/ContactForm/validationSchema'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import { useModal } from '@/hooks/useModal'
// import { browserSendEmail } from '@/utils/email/browserSendEmail'
import { browserPostEmail } from '@/utils/email/browserPostEmail'
import ContactInfo from '@/ui/ContactInfo/ContactInfo'
import { useInView, motion } from 'framer-motion'
const ErrorModal = dynamic(() => import('@/modals/Error/Error'), { ssr: false })
const ThanksModal = dynamic(() => import('@/modals/Thanks/Thanks'), {
  ssr: false,
})
const AnimatedText = dynamic(() => import('@/ui/AnimatedText/AnimatedText'))

import styles from './ContactForm.module.scss'

type FormValues = {
  fullName: string
  companyName: string
  email: string
  phone: string
  location: string
  message: string
}

const defaultValues = {
  fullName: '',
  companyName: '',
  email: '',
  phone: '',
  location: '',
  message: '',
}

const ContactForm: FC<{ className?: string }> = ({ className }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormValues>({
    values: defaultValues,
    resolver: yupResolver(validationSchema),
  })
  const openThanksModal = useModal(ThanksModal, { size: 'xs' })
  const openErrorModal = useModal(ErrorModal, { size: 'xs' })
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [sending, setSending] = useState(false)

  const container = {
    visible: () => ({
      transition: { staggerChildren: 0.05 },
    }),
  }

  const boxFrame = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        duration: 1,
        delay: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSending(true)

    await browserPostEmail({
      subject: `Let's talk!`,
      htmlMessage: 'Hello, I want to test this mail',
      data,
    })
      .then((response) => {
        console.log('response ', response)
      })
      .catch((error) => {
        console.log('error ', error)
      })

    // await browserSendEmail({
    //   subject: `Let's talk!`,
    //   htmlMessage: 'Hello, I want to test this mail',
    //   data,
    // })
    //   .then((response) => response.json())
    //   .then(({ success = false, response = null }) => {
    //     if (success && response && response.messageId) {
    //       openThanksModal()
    //       setSending(false)
    //       reset()
    //     } else {
    //       openErrorModal()
    //       reset()
    //       setSending(false)
    //     }
    //   })
    //   .catch((error) => {
    //     openErrorModal()
    //     setSending(false)
    //     console.error(`Error on send email ${error}`)
    //   })
  }

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : ''}
    >
      <div className={classNames(styles['form__contacts'], 'd-md-none')}>
        <p className={classNames('h1', styles['form__title'])}>
          <AnimatedText title withBlueDot>{`Let's talk`}</AnimatedText>
        </p>
        <p className={styles['form__subtitle']}>
          <AnimatedText>Stay in touch with us:</AnimatedText>
        </p>
        <ContactInfo className={styles['form__contacts_box']} />
      </div>
      <h4 className="h4">
        <AnimatedText>Fill in the short contact form</AnimatedText>
      </h4>
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <motion.div variants={boxFrame}>
          <Controller
            control={control}
            name="fullName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  placeholder="your Full name"
                  label="Please include your first and last
name*"
                  error={errors['fullName']?.message}
                />
              )
            }}
          />
        </motion.div>
        <motion.div variants={boxFrame}>
          <Controller
            control={control}
            name="companyName"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  placeholder="Company name"
                  label="Are you contacting on behalf of a company? "
                  error={errors['companyName']?.message}
                />
              )
            }}
          />
        </motion.div>
        <motion.div variants={boxFrame}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  placeholder="Your Email"
                  label="And a-mail*"
                  error={errors['email']?.message}
                />
              )
            }}
          />
        </motion.div>
        <motion.div variants={boxFrame}>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  placeholder="Your Phone"
                  label="How about a phone number?*"
                  error={errors['phone']?.message}
                />
              )
            }}
          />
        </motion.div>
        <motion.div variants={boxFrame}>
          <Controller
            control={control}
            name="location"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  placeholder="Location (City/state)"
                  label="City*"
                  error={errors['location']?.message}
                />
              )
            }}
          />
        </motion.div>
        <motion.div variants={boxFrame}>
          <Controller
            control={control}
            name="message"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  placeholder="Your message"
                  label="Now write down your message *"
                  error={errors['message']?.message}
                  element="textarea"
                />
              )
            }}
          />
        </motion.div>
        <motion.div variants={boxFrame}>
          <ButtonPrimary
            type="submit"
            variant="blue"
            fullWidth
            className={styles['form__action']}
            isLoading={sending}
          >
            Submit
          </ButtonPrimary>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default ContactForm

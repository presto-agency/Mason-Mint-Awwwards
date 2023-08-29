import { FC, useCallback, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import styles from './BecomeADistributorForm.module.scss'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import TextField from '@/ui/TextField/TextField'
import { yupResolver } from '@hookform/resolvers/yup'
import { validationSchema } from '@/modules/BecomeADistributor/ui/BecomeADistributorForm/validationSchema'
import { browserSendEmail } from '@/utils/email/browserSendEmail'
import { useModal } from '@/hooks/useModal'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'
import { OptionInterface } from '@/utils/types'
import { countryList } from '@/utils/countries/countryList'
import { useInView, motion } from 'framer-motion'
const CustomSelect = dynamic(() => import('@/ui/SelectField/SelectField'), {
  ssr: false,
})
const ErrorModal = dynamic(() => import('@/modals/Error/Error'), { ssr: false })
const ThanksModal = dynamic(() => import('@/modals/Thanks/Thanks'), {
  ssr: false,
})

type FormValues = {
  fullName: string
  email: string
  phone: string
  website: string
  companyName: string
  city: string
  message: string
  companyAddress: string
  postalCode: string
  country: string
  state: string
}

const defaultValues = {
  fullName: '',
  email: '',
  phone: '',
  website: '',
  companyName: '',
  city: '',
  message: '',
  companyAddress: '',
  postalCode: '',
  country: '',
  state: '',
}

const BecomeADistributorForm: FC<{
  className?: string
}> = ({ className }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    clearErrors,
    reset,
  } = useForm<FormValues>({
    values: defaultValues,
    resolver: yupResolver(validationSchema),
  })

  const openThanksModal = useModal(ThanksModal, { size: 'xs' })
  const openErrorModal = useModal(ErrorModal, { size: 'xs' })
  const [selectedCountry, setSelectedCountry] =
    useState<OptionInterface | null>(null)
  const [selectedState, setSelectedState] = useState<OptionInterface | null>(
    null
  )
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
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  }

  const countriesOptions: OptionInterface[] = useMemo(() => {
    const data = countryList[0].data
    return data.map((country) => {
      return {
        label: country.name,
        value: country.name,
        states: country.states,
      }
    })
  }, [])

  const stateOptions: OptionInterface[] = useMemo(() => {
    if (selectedCountry) {
      const { states } = selectedCountry
      if (states?.length) {
        return states.map(({ name }) => {
          return {
            value: name,
            label: name,
          }
        })
      }
    }

    return [{ label: 'No states', value: 'disabled', disabled: true }]
  }, [selectedCountry])

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setSending(true)
    await browserSendEmail({
      subject: `Become a distributor`,
      htmlMessage: 'Hello, I want to be a distributor',
      data,
    })
      .then((response) => response.json())
      .then(({ success = false, response = null }) => {
        if (success && response && response.messageId) {
          openThanksModal()
          setSending(false)
          reset()
        } else {
          openErrorModal()
          reset()
          setSending(false)
        }
      })
      .catch((error) => {
        openErrorModal()
        setSending(false)
        console.error(`Error on send email ${error}`)
      })
  }

  const handleStateChange = useCallback(
    (option: OptionInterface | null) => {
      if (option) {
        setSelectedState(option)
        setValue('state', option.label)
        clearErrors('state')
      }
    },
    [setSelectedState, setValue, clearErrors]
  )

  const handleCountryChange = useCallback(
    (option: OptionInterface | null) => {
      if (option) {
        setSelectedCountry(option)
        setValue('country', option.label)
        // reset state
        setSelectedState(null)
        setValue('state', '')
        clearErrors('country')
      }
    },
    [setSelectedCountry, setValue, setSelectedState, clearErrors]
  )

  return (
    <motion.div
      className={className}
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? 'visible' : ''}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles['form']}>
        <h4 className="h4">Contact info</h4>
        <div className={styles['form__group']}>
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
        </div>
        <h4 className="h4">Company info</h4>
        <div className={styles['form__group']}>
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
              name="website"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    placeholder="Website URL"
                    label="Website URL*"
                    error={errors['website']?.message}
                  />
                )
              }}
            />
          </motion.div>
        </div>
        <h4 className="h4">Address</h4>
        <div className={styles['form__group']}>
          <motion.div variants={boxFrame}>
            <Controller
              control={control}
              name="companyAddress"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    placeholder="Company address"
                    label="Company address*"
                    error={errors['companyAddress']?.message}
                  />
                )
              }}
            />
          </motion.div>
          <div className="row">
            <div className="col-md-6">
              <motion.div variants={boxFrame}>
                <Controller
                  control={control}
                  name="country"
                  render={({ field }) => {
                    return (
                      <CustomSelect
                        {...field}
                        placeholder="Country"
                        label="Country*"
                        selectedOption={selectedCountry}
                        onChange={handleCountryChange}
                        error={errors['country']?.message}
                        options={countriesOptions}
                        isSearchable
                      />
                    )
                  }}
                />
              </motion.div>
            </div>
            <div className="col-md-6">
              <motion.div variants={boxFrame}>
                <Controller
                  control={control}
                  name="state"
                  render={({ field }) => {
                    return (
                      <CustomSelect
                        {...field}
                        placeholder="Select State"
                        label="Select State*"
                        selectedOption={selectedState}
                        onChange={handleStateChange}
                        error={errors['state']?.message}
                        options={stateOptions}
                      />
                    )
                  }}
                />
              </motion.div>
            </div>
            <div className="col-md-6">
              <motion.div variants={boxFrame}>
                <Controller
                  control={control}
                  name="city"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        placeholder="City"
                        label="City*"
                        error={errors['city']?.message}
                      />
                    )
                  }}
                />
              </motion.div>
            </div>
            <div className="col-md-6">
              <motion.div variants={boxFrame}>
                <Controller
                  control={control}
                  name="postalCode"
                  render={({ field }) => {
                    return (
                      <TextField
                        {...field}
                        placeholder="Postal code"
                        label="Postal code*"
                        error={errors['postalCode']?.message}
                      />
                    )
                  }}
                />
              </motion.div>
            </div>
          </div>
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
        </div>
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

export default BecomeADistributorForm

import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import TextField from '@/ui/TextField/TextField'
import Container from '@/app/layouts/Container'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'

import styles from '../AdminLogin/adminLogin.module.scss'
import axios from 'axios'

type FormProps = {
  email: string
  password: string
}

const AdminRegistration = () => {
  const [error, setError] = useState<string | null>(null)
  const { handleSubmit, control, getValues } = useForm<FormProps>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setError(null)
    }, 3000)
    return () => clearInterval(interval)
  }, [error])

  const onSubmit = (data: FormProps) => {
    if (data.email !== '' && data.password !== '') {
      axios
        .post('/api/auth/signup', data)
        .then((res) => {
          console.log('res ', res)
        })
        .catch((error) => {
          console.log('Error on registration ', error)
        })
    } else {
      setError('Email and password are required!')
    }
  }

  return (
    <div className={styles['page']}>
      <Container>
        <div className={styles['page__form']}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    value={getValues().email}
                    label="Email*"
                    placeholder="Your email"
                  />
                )
              }}
            />
            <Controller
              control={control}
              name="password"
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    value={getValues().password}
                    label="Password*"
                    placeholder="Your password"
                    type="password"
                  />
                )
              }}
            />
            <ButtonPrimary type="submit">Sign Up</ButtonPrimary>
            {error && <p className={styles['page__form_message']}>{error}</p>}
          </form>
        </div>
      </Container>
    </div>
  )
}

export default AdminRegistration

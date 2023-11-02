import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import TextField from '@/ui/TextField/TextField'
import Container from '@/app/layouts/Container'
import { ButtonPrimary } from '@/ui/ButtonPrimary/ButtonPrimary'

import styles from './adminLogin.module.scss'
import routes from '@/utils/routes'

type FormProps = {
  email: string
  password: string
}

const AdminLogin = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [error, setError] = useState<string | null>(null)
  const { handleSubmit, control, getValues } = useForm<FormProps>({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (session?.user) {
      router.push(routes.private.products)
    }
  }, [session, router])

  useEffect(() => {
    const interval = setInterval(() => {
      setError(null)
    }, 3000)
    return () => clearInterval(interval)
  }, [error])

  const onSubmit = async (data: FormProps) => {
    if (
      data.email === 'admin.user@mason.mint' &&
      data.password === 'tIKVO7DwhnWwTmF'
    ) {
      try {
        await signIn('credentials', {
          redirect: false,
          email: data.email,
          password: data.password,
        })
      } catch (error) {
        console.log('Error on sign in ', error)
      }
    } else {
      setError('Sorry, you are not an administrator of this site.')
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
            <ButtonPrimary type="submit">Sign In</ButtonPrimary>
            {error && <p className={styles['page__form_message']}>{error}</p>}
          </form>
        </div>
      </Container>
    </div>
  )
}

export default AdminLogin

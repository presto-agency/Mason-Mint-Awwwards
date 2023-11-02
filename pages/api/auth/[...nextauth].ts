import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../../models/User'
import db from '@/utils/db'

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        await db.connect()
        const user = await User.findOne({
          email: credentials?.email || '',
        })

        if (user) {
          return user
        }

        throw new Error('Invalid email or password')
      },
    }),
  ],
})

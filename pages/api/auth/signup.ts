import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import db from '@/utils/db'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return
  }
  const { email, password } = req.body
  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 5
  ) {
    return res.status(422).json({ message: 'Validation error' })
  }

  await db.connect()
  const existingUser = await User.findOne({ email: email })
  if (existingUser) {
    res.status(422).json({ message: 'User already exists' })
    return
  }

  const newUser = new User({
    email,
    password: bcrypt.hashSync(password),
  })

  const user = await newUser.save()

  res.status(201).send({
    success: true,
    _id: user._id,
    email: user.email,
  })
}

export default handler

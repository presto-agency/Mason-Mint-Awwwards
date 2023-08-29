import React, { FC } from 'react'
import { motion } from 'framer-motion'

type CharacterProps = {
  text: string
}

const AnimatedTextCharacter: FC<CharacterProps> = ({ text }) => {
  const letters = Array.from(text)

  const container = {
    visible: (i = 1) => ({
      transition: { staggerChildren: 0.01, delayChildren: 0.01 * i + 1 },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 3,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <motion.div
      style={{ overflow: 'hidden', display: 'flex' }}
      variants={container}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  )
}

export default AnimatedTextCharacter

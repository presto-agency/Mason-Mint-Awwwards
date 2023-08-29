import { ReactNode, FC, useRef, useState } from 'react'
import classNames from 'classnames'
import { useOnClickOutside } from 'usehooks-ts'
import { motion } from 'framer-motion'
import ArrowSelect from '@/ui/Icons/ArrowSelect'

import styles from './Dropdown.module.scss'

type DropdownProps = {
  className?: string
  children: ReactNode
  placeholder?: string
}

const Dropdown: FC<DropdownProps> = ({
  className,
  children,
  placeholder = 'Select by',
}) => {
  const ref = useRef(null)
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)

  const handleClickOutside = () => {
    setIsOpenMenu(false)
  }

  useOnClickOutside(ref, handleClickOutside)

  const menuAppearsAnimate = {
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      y: -5,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
      transitionEnd: {
        display: 'none',
      },
    },
  }

  return (
    <div
      className={classNames(styles['dropdown'], className)}
      ref={ref}
      data-id="select-field"
    >
      <div
        className={styles['dropdown__header']}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        <p className={styles['dropdown__header_placeholder']}>{placeholder}</p>
        <ArrowSelect
          className={classNames(
            styles['dropdown__arrow'],
            isOpenMenu ? styles['active'] : ''
          )}
        />
        <div
          className={styles['dropdown__header_border']}
          style={{ opacity: !isOpenMenu ? 1 : 0 }}
        />
      </div>
      <motion.div
        initial="exit"
        animate={isOpenMenu ? 'enter' : 'exit'}
        variants={menuAppearsAnimate}
        className={styles['dropdown__menu']}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default Dropdown

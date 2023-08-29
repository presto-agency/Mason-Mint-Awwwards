import { ChangeEvent, ForwardedRef, forwardRef, RefObject, useRef } from 'react'
import classNames from 'classnames'
import Attention from '@/ui/Icons/Attention'
import Resize from '@/ui/Icons/Resize'

import styles from './TextField.module.scss'

type TextFieldProps = {
  value?: string
  name: string
  placeholder?: string
  label?: string
  error?: string
  className?: string
  type?: string | 'text' | 'email' | 'tel'
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  element?: string | 'input' | 'textarea'
  readOnly?: boolean
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      className,
      label,
      error,
      placeholder,
      type = 'text',
      onChange,
      element = 'input',
      value,
      readOnly = false,
    }: TextFieldProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const textAreaRef: RefObject<HTMLTextAreaElement> = useRef(null)

    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onChange && onChange(e)
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + 'px'
      }
    }

    return (
      <label
        className={classNames(
          styles['inputField'],
          readOnly ? styles['readonly'] : '',
          className
        )}
      >
        {element === 'textarea' ? (
          <>
            <textarea
              className={styles['inputField__item']}
              name={name}
              placeholder={placeholder}
              onChange={handleChange}
              ref={textAreaRef}
              value={value}
              readOnly={readOnly}
            />
            <Resize className={styles['inputField__item_resize']} />
          </>
        ) : (
          <input
            className={styles['inputField__item']}
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            value={value}
            onChange={handleChange}
            readOnly={readOnly}
          />
        )}
        {label && (
          <p
            className={classNames(
              styles['inputField__label'],
              error ? styles['__error'] : ''
            )}
          >
            {label}
          </p>
        )}
        <div
          className={classNames(
            styles['inputField__border'],
            error ? styles['__error'] : ''
          )}
        />
        {error && (
          <p className={styles['inputField__message']}>
            <Attention className={styles['inputField__message_icon']} />
            {error}
          </p>
        )}
      </label>
    )
  }
)

export default TextField

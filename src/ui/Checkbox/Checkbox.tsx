import classNames from 'classnames'
import styles from './Checkbox.module.scss'
import { ChangeEvent, ForwardedRef, forwardRef } from 'react'

type CheckBoxProps = {
  className?: string
  name: string
  id: string
  checked: boolean
  label?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    { className, id, name, label, checked, onChange }: CheckBoxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <div className={classNames(styles['Checkbox'], className)}>
        <input
          id={id}
          name={name}
          checked={checked}
          type="checkbox"
          onChange={onChange}
        />
        {label && <label htmlFor={id}>{label}</label>}
      </div>
    )
  }
)

export default Checkbox

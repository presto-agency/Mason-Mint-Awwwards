import React, {
  FC,
  ForwardedRef,
  forwardRef,
  useCallback,
  useState,
} from 'react'
import Select, {
  StylesConfig,
  components,
  MenuListProps,
  GroupBase,
  DropdownIndicatorProps,
} from 'react-select'
import classNames from 'classnames'
import Attention from '@/ui/Icons/Attention'
import ArrowSelect from '@/ui/Icons/ArrowSelect'
import { OptionInterface } from '@/utils/types'

import styles from './SelectField.module.scss'

type SelectOptionProps = {
  name: string
  placeholder?: string
  label?: string
  error?: string
  className?: string
  onChange: (option: OptionInterface | null) => void
  selectedOption?: OptionInterface | null
  options: OptionInterface[]
  isSearchable?: boolean
  isDisabled?: boolean
}

const SelectField = forwardRef<HTMLInputElement, SelectOptionProps>(
  (
    {
      name,
      className,
      label,
      error,
      placeholder = 'State',
      onChange,
      selectedOption,
      options,
      isSearchable = false,
      isDisabled = false,
    }: SelectOptionProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const [isFocused, setIsFocused] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const customStyles: StylesConfig<OptionInterface, false> = {
      valueContainer: (base) => ({
        ...base,
        padding: '0',
        display: 'flex',
        flex: 'initial',
        marginTop: '2rem',
        width: '100%',
      }),
      placeholder: (base) => ({
        ...base,
        margin: '0',
        fontSize: '15rem',
        '@media (max-width: 767px)': {
          fontSize: '13rem',
        },
        fontWeight: '500',
        color: 'var(--black)',
        textTransform: 'uppercase',
      }),
      control: (base) => ({
        ...base,
        minHeight: 'initial',
        display: 'flex',
        borderStyle: 'initial',
        borderRadius: 'initial',
        height: '44rem',
        cursor: 'pointer',
        borderColor: 'transparent',
        boxShadow: 'initial',
        backgroundSize: '24rem',
        backgroundColor: 'var(--white)',
        '&:hover': {
          borderColor: 'transparent',
        },
        '&:focus': {
          borderColor: 'transparent',
          outline: 'none',
        },
      }),
      indicatorsContainer: (base) => ({
        ...base,
        position: 'absolute',
        right: 0,
        top: '9rem',
        width: '24rem',
        height: '24rem',
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        display: 'none',
      }),
      dropdownIndicator: (provided, state) => ({
        ...provided,
        width: '100%',
        height: '100%',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: state.isFocused ? 'var(--primary-color)' : 'var(--black)',
        transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      }),
      menu: (provided) => ({
        ...provided,
        borderRadius: 16,
      }),
      menuList: (provided) => ({
        ...provided,
        backgroundColor: 'var(--white)',
        borderColor: 'var(--black)',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 16,
        padding: '16rem 0',
      }),
      option: (provided, state) => ({
        ...provided,
        cursor: state.isFocused ? 'pointer' : 'auto',
        padding: '8rem 16rem',
        backgroundColor: state.isSelected
          ? 'var(--primary-color)'
          : 'var(--white)',
        color: state.isSelected ? 'var(--white)' : 'var(--black)',
        ':active': {
          backgroundColor: 'var(--white)',
        },
        ':hover': {
          color: !state.isSelected ? 'var(--primary-color)' : 'var(--white)',
        },
        transition:
          'background-color var(--hover-duration) var(--ease), color var(--hover-duration) var(--ease)',
        pointerEvents: state.isDisabled ? 'none' : 'auto',
      }),
      singleValue: (provided) => ({
        ...provided,
        maxWidth: '90%',
      }),
    }

    const CustomMenuList: FC<
      MenuListProps<OptionInterface, false, GroupBase<OptionInterface>>
    > = (props) => {
      const { children } = props
      return (
        <components.MenuList {...props}>
          <div data-lenis-prevent>{children}</div>
        </components.MenuList>
      )
    }

    const CustomDropdownIndicator: FC<
      DropdownIndicatorProps<OptionInterface, false, GroupBase<OptionInterface>>
    > = (props) => {
      return (
        <components.DropdownIndicator
          {...props}
          className={styles['selectField__dropdownIndicator']}
        >
          <ArrowSelect className={styles['selectField__arrow']} />
        </components.DropdownIndicator>
      )
    }

    const handleChange = useCallback(
      (option: OptionInterface | null) => {
        onChange && onChange(option)
      },
      [onChange]
    )

    return (
      <div
        className={classNames(styles['selectField'], className, {
          [styles['active']]: isFocused,
        })}
        data-id="select-field"
      >
        <Select<OptionInterface, false>
          components={{
            MenuList: CustomMenuList,
            DropdownIndicator: CustomDropdownIndicator,
          }}
          isSearchable={isSearchable}
          name={name}
          value={selectedOption}
          options={options}
          styles={customStyles}
          classNamePrefix="select"
          placeholder={placeholder}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onMenuOpen={() => setIsMenuOpen(true)}
          onMenuClose={() => setIsMenuOpen(false)}
          isDisabled={isDisabled}
          isOptionDisabled={(option: OptionInterface) => !!option.disabled}
          hideSelectedOptions={false}
          isMulti={false}
        />
        {label && (
          <p
            className={classNames(
              styles['selectField__label'],
              error ? styles['__error'] : ''
            )}
          >
            {label}
          </p>
        )}
        <div
          className={classNames(
            styles['selectField__border'],
            error ? styles['__error'] : '',
            isMenuOpen ? styles['__hidden'] : ''
          )}
        ></div>
        {error && (
          <p className={classNames(styles['selectField__message'])}>
            <Attention className={styles['selectField__message_icon']} />
            {error}
          </p>
        )}
      </div>
    )
  }
)

export default SelectField

import React, {
  createContext,
  Fragment,
  ReactElement,
  useCallback,
  useRef,
  useState,
  ComponentType,
  useContext,
} from 'react'
import { Store } from '@/utils/Store'

type Modal = ReactElement

export type ModalContextType = [(modal: Modal) => void, () => void]

export const ModalContext = createContext<ModalContextType | null>(null)

export const withModal = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const modalsRef = useRef<Modal[]>([])
    const [modals, setModals] = useState<Modal[]>([])
    const store = useContext(Store)

    const addModal = (modal: Modal) => {
      modalsRef.current.push(modal)
      setModals([...modalsRef.current])
      store?.dispatch && store?.dispatch({ type: 'OPEN_MODAL' })
    }

    const closeModal = useCallback(() => {
      modalsRef.current = modalsRef.current.slice(0, -1)
      setModals([...modalsRef.current])
      store?.dispatch && store?.dispatch({ type: 'CLOSE_MODAL' })
    }, [modalsRef, setModals, store])

    return (
      <ModalContext.Provider value={[addModal, closeModal]}>
        <WrappedComponent {...props} />
        {modals.map((modal, index) => (
          <Fragment key={index}>{modal}</Fragment>
        ))}
      </ModalContext.Provider>
    )
  }
}

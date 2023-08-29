import { useContext, FC, ComponentType } from 'react'
import { ModalContext, ModalContextType } from '@/context/modal'
import { ModalWindowProps } from '@/ui/ModalWindow/ModalWindow'

type Options = {
  size?: string
}

export const useModal = (
  ModalComponent: FC<ModalWindowProps> | ComponentType<ModalWindowProps>,
  options: Options = {}
) => {
  const { size = 'md', ...modalProps } = options
  const [openModal, closeModal] = useContext(ModalContext) as ModalContextType
  return (onCancel?: () => void) => {
    const handleCancel = () => {
      closeModal()
      onCancel && onCancel()
    }

    openModal(
      <ModalComponent onClose={handleCancel} size={size} {...modalProps} />
    )

    return closeModal
  }
}

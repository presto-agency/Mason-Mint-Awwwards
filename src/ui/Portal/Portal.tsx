import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type PortalProps = {
  children: ReactNode
  element?: HTMLElement
}

export const Portal: FC<PortalProps> = ({ children }) => {
  const ref = useRef<Element | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector<HTMLElement>('#portal')
    setMounted(true)
    return () => setMounted(false)
  }, [])

  if (!mounted || !ref.current) return null

  return createPortal(children, ref.current)
}

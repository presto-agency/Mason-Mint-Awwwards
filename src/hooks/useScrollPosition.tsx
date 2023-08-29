import { useEffect, useState } from 'react'

type ScrollPosition = {
  x: number
  y: number
}

type UseScrollPosition = {
  scrollPosition: ScrollPosition
}

export const useScrollPosition = (
  initial: ScrollPosition = {
    x: 0,
    y: 0,
  }
): UseScrollPosition => {
  const [mousePosition, setMousePosition] = useState(initial)

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  return {
    scrollPosition: mousePosition,
  }
}

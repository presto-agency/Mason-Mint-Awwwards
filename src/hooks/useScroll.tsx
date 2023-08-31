import { useCallback, useEffect, useState } from 'react'

const useScroll = () => {
  const [y, setY] = useState<number>(0)
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('up')
  const [scrolled, setScrolled] = useState(false)

  const onScroll = useCallback(() => {
    if (scrolled && y > window.scrollY) {
      setScrollDirection('up')
    } else if (scrolled && y < window.scrollY) {
      setScrollDirection('down')
    }
    setY(window.scrollY)

    if (window.scrollY > 10) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }, [scrolled, y])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [onScroll])

  return {
    scrolled,
    scrollDirection,
  }
}

export { useScroll }

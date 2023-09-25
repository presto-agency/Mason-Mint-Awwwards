import { RefObject, useContext, useEffect } from 'react'
import { ProducsSectionContext } from '../../../lib/ProductListContext'

export const useCategoryBlockInView = (
  ref: RefObject<HTMLDivElement>,
  sectionId: string
) => {
  const { setActiveSection } = useContext(ProducsSectionContext)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.boundingClientRect.top <= 0 &&
          entry.boundingClientRect.bottom > 0
        ) {
          setActiveSection(sectionId)
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -100% 0px',
        threshold: 0,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, sectionId, setActiveSection])
}

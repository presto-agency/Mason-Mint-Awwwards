import { ImagesProps } from '@/utils/types'

const placeholder = [
  '/images/coin-placeholder.png',
  '/images/coin-placeholder.png',
]
const currentSite = 'masonmint.com'

export const detectImages = (array: ImagesProps[] | undefined, order = 0) => {
  if (
    array?.length &&
    array[order]?.ImageUrl &&
    !array[order]?.ImageUrl?.includes(currentSite)
  ) {
    return array[order].ImageUrl
  }
  return placeholder[order]
}

export const detectImage = (obj: ImagesProps | undefined, order = 0) => {
  if (obj?.ImageUrl && obj?.ImageUrl.includes(currentSite)) {
    return placeholder[order]
  }

  return obj?.ImageUrl
}

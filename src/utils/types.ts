export type ProductProps = {
  id: string
  ProductName: string
  Metal?: string
  mainImages: MainImagesProps
  additionalImages: ImagesProps[]
  specification: SpecificationProps[]
  slug: string
  isFeatured: boolean
  category?: CategoryProps
  description?: string
}

export type MainImagesProps = {
  obverse: string | null
  reverse: string | null
}

export type SpecificationProps = {
  ActualMetalWeight: string
  CoinWeight: string
  Diameter: string
  Thickness: string
  EdgeDesign: string
  Series: string
  Fineness: string
  IraApproved: string
}

export type ImagesProps = {
  ImageUrl?: string
}

export type CategoryProps = {
  name?: string
  id?: string
  products?: { id: string; name: string }[]
}

export interface OptionInterface {
  value: string | undefined
  label: string
  states?:
    | { name: string; state_code: string }[]
    | { name: string; state_code: null }[]
  disabled?: boolean | undefined
}

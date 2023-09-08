export interface FlipCoinTypes {
  v: string
  fr: number
  ip: number
  op: number
  w: number
  h: number
  nm: string
  ddd: number
  assets: Asset[]
  layers: Layer2[]
  // markers: any[]
}

interface Layer2 {
  ddd: number
  ind: number
  ty: number
  nm: string
  cl: string
  refId: string
  sr: number
  ks: Ks2
  ao: number
  w: number
  h: number
  ip: number
  op: number
  st: number
  bm: number
}

interface Ks2 {
  o: O
  r: O
  p: P2
  a: P2
  s: P2
}

interface P2 {
  a: number
  k: number[]
  ix: number
  l: number
}

interface O {
  a: number
  k: number
  ix: number
}

interface Asset {
  id: string
  w?: number
  h?: number
  t?: string
  u?: string
  p?: string
  e?: number
  layers?: Layer[]
}

interface Layer {
  ty: number
  sc: string
  refId: string
  ks: Ks
  ip: number
  st: number
  op: number
  sr: number
  bm: number
}

interface Ks {
  p: P
  a: P
  s: P
  r: P
  o: P
}

interface P {
  a: number
  k: number[]
}

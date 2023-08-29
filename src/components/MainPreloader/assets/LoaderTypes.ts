export interface MainLottieTypes {
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
  a: A
  s: S
  r: R
  o: O
}

interface P {
  a: number
  k: number[]
}

interface A {
  a: number
  k: number[]
}

interface S {
  a: number
  k: number[]
}

interface R {
  a: number
  k: number[]
}

interface O {
  a: number
  k: number[]
}

interface Layer2 {
  ddd: number
  ind: number
  ty: number
  nm: string
  td?: number
  sr: number
  ks: Ks2
  ao: number
  shapes?: Shape[]
  ip: number
  op: number
  st: number
  ct?: number
  bm: number
  tt?: number
  tp?: number
  refId?: string
  w?: number
  h?: number
}

interface Ks2 {
  o: O2
  r: R2
  p: P2
  a: A2
  s: S2
}

interface O2 {
  a: number
  k: number
  ix: number
}

interface R2 {
  a: number
  k: number
  ix: number
}

interface P2 {
  a: number
  k: number[]
  ix: number
  l: number
}

interface A2 {
  a: number
  k: number[]
  ix: number
  l: number
}

interface S2 {
  a: number
  k: number[]
  ix: number
  l: number
}

interface Shape {
  ty: string
  it: It[]
  nm: string
  np: number
  cix: number
  bm: number
  ix: number
  mn: string
  hd: boolean
}

interface It {
  ty: string
  d?: number
  s: S3
  p?: P3
  // r: any
  nm: string
  mn?: string
  hd?: boolean
  o?: O3
  bm?: number
  g?: G
  e?: E
  t?: number
  a?: A3
  sk?: Sk
  sa?: Sa
}

interface S3 {
  a: number
  k: number[]
  ix: number
}

interface P3 {
  a: number
  k: number[]
  ix: number
}

interface O3 {
  a: number
  k: number
  ix: number
}

interface G {
  p: number
  k: K
}

interface K {
  a: number
  k: number[]
  ix: number
}

interface E {
  a: number
  k: number[]
  ix: number
}

interface A3 {
  a: number
  k: number[]
  ix: number
}

interface Sk {
  a: number
  k: number
  ix: number
}

interface Sa {
  a: number
  k: number
  ix: number
}

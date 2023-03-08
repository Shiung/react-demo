export interface IJersry {
  base: string
  sleeve: string
  sleeveDetails: string
  styleColor: string
  style: 'stripes' | 'horizontal' | 'squares' | ''
  className?: string
}

export interface IJersrySid extends IJersry {
  sid: 1 | 2
}

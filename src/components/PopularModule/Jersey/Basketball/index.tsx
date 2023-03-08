import cx from 'classnames'
import { ReactComponent as Base } from './pics/base.svg'
import { ReactComponent as Stripes } from './pics/stripes.svg'
import { ReactComponent as HorizonStripes } from './pics/horizonStripes.svg'
import { ReactComponent as Squares } from './pics/squares.svg'
import texture from './pics/texture.png'

import Style from '../jersey.module.scss'
import type { IJersry } from '../types'

const Basketball = (props: IJersry) => {
  const { className, base, style, styleColor } = props
  return (
    <div className={cx(Style.main, className)}>
      <Base fill={base} />
      {style === 'stripes' && <Stripes fill={styleColor} />}
      {style === 'horizontal' && <HorizonStripes fill={styleColor} />}
      {style === 'squares' && <Squares fill={styleColor} />}
      <img style={{ height: '100%' }} src={texture} alt=''/>
    </div>
  )
}

export default Basketball

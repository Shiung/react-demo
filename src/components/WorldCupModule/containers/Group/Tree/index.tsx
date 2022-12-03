import { useState, useCallback, useRef } from 'react'
import cx from 'classnames'

import { ReactComponent as Label } from '../../../svg/label.svg'
import { ReactComponent as ArrowDown } from '../../../svg/arrow-down.svg' //'@sportIcons/index'

import { LabelConf } from './constants'
import TreeContextProvider, { useTreeContext } from './store/TreeContext'
import Map from './Map'
import styles from './Tree.module.scss'

// import FormatMessage from '@/sports/components/FormatMessage'

const LabelName = ({ label }: { label: LabelConf }) => {
  return (
    <>
      {/* {label === LabelConf.w16 && <FormatMessage msgCode='worldCup.theRoundOf16' />}
      {label === LabelConf.w8 && <FormatMessage msgCode='worldCup.quarterfinal' />}
      {label === LabelConf.w4 && <FormatMessage msgCode='worldCup.semifinal' />}
      {label === LabelConf.w1 && <FormatMessage msgCode='worldCup.championship' />} */}
      {label === LabelConf.w16 && '16強'}
      {label === LabelConf.w8 && '8強'}
      {label === LabelConf.w4 && '4強'}
      {label === LabelConf.w1 && '冠軍'}
    </>
  )
}

const CurrentLabel = () => {
  const { label } = useTreeContext()
  return (
    <div className={styles.name}>
      <LabelName label={label}/>
    </div>
  )
}

const Option = () => {
  const { label, labelHandler } = useTreeContext()
  return (
    <div className={styles.option}>
      <div onClick={labelHandler.bind(null, LabelConf.w16)} className={cx({ [styles.active]: label === LabelConf.w16})}>
        <LabelName label={LabelConf.w16}/>
      </div>
      <div onClick={labelHandler.bind(null, LabelConf.w8)} className={cx({ [styles.active]: label === LabelConf.w8})}>
        <LabelName label={LabelConf.w8}/>
      </div>
      <div onClick={labelHandler.bind(null, LabelConf.w4)} className={cx({ [styles.active]: label === LabelConf.w4})}>
        <LabelName label={LabelConf.w4}/>
      </div>
      <div onClick={labelHandler.bind(null, LabelConf.w1)} className={cx({ [styles.active]: label === LabelConf.w1})}>
        <LabelName label={LabelConf.w1}/>
      </div>
    </div>
  )
}


const Tree = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const openHandler = useCallback(() => setOpen(prev => !prev), [])

  return (
    <TreeContextProvider boxRef={boxRef}>
      <div className={styles.header}>
        <div className={cx(styles.selector, { [styles.open]: open })} onClick={openHandler}>
          <Label />
          <CurrentLabel />
          <ArrowDown className={styles.arrow} width='20px' height='20px' />

          {open && <Option />}
        </div>
        {open && <div className={styles.mask} onClick={openHandler} />}
      </div>
      <div className={styles.wrapper} ref={boxRef} id='tree'>
        <Map />
      </div>
    </TreeContextProvider>
  )
}

export const TreeEvent = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)
  const openHandler = useCallback(() => setOpen(prev => !prev), [])

  return (
    <TreeContextProvider boxRef={boxRef} isEventPage>
      <div className={cx(styles.header, styles.event)}>
        <div className={cx(styles.selector, { [styles.open]: open })} onClick={openHandler}>
          <Label />
          <CurrentLabel />
          <ArrowDown className={styles.arrow} width='20px' height='20px' />

          {open && <Option />}
        </div>
        {open && <div className={styles.mask} onClick={openHandler} />}
      </div>
      <div className={styles.scrollEventBox}>
        <div className={styles.wrapper} ref={boxRef} id='tree'>
          <Map useVote />
        </div>
      </div>
    </TreeContextProvider>
  )
}


export default Tree

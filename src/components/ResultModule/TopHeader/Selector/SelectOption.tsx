import React, { useCallback } from 'react'
import cx from 'classnames'
// import { history } from '@/utils'
import { useHistory } from 'react-router-dom'
import { SelectList } from '../../types'
import styles from './Selector.module.scss'

type Props = {
  list?: SelectList,
  selectedId?: string,
  clickCallBack?: () => void
}

const emptyList: SelectList = []

const SelectOption: React.FC<Props> = ({ list = emptyList, selectedId = '', clickCallBack }) => {
  const history = useHistory()
  const clickHandler = useCallback((url) => {
    typeof clickCallBack === 'function' && clickCallBack()
    history.replace(url)
  }, [clickCallBack, history])

  return (
    <div className={cx(styles.options)}>
      {list?.map(({ id, text, url }) => {
        return (
          <div
            key={id}
            className={cx(styles.option, { [styles.active]: selectedId === id })}
            onClick={() => clickHandler(url)}>
              {text}
          </div>
        )
      })}
    </div>
  )
}

export default SelectOption
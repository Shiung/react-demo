import React from "react"
import OddsResult from '../OddsResult'
import { ContentProps } from './types'
import styles from './Content.module.scss'

const ColOne: React.FC<ContentProps> = ({ parseResultData }) => {
  return (
    <div className={styles.container}>
      {parseResultData.map(({ title, result, k }, idx) => {
        return <OddsResult key={`${k}-${idx}`} result={result} title={title} />
      })}
    </div>
  )
}

export default ColOne

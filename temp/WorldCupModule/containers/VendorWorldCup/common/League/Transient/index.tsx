import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ContainerBox from '@sportComponents/ContainerBox/wap'
import Empty from '@sportComponents/Empty'
import SimpleHeader from '@sportComponents/Header/SimpleHeader'
import PlaceHolder from '@sportPages/mobile/components/League/PlaceHolder'
import { history } from '@sport/utils'

import { useDateListContext } from '../store/dateList-context'
import { parsePath } from '../utils'

import WCButton from '@sport/components/WorldCupModule/components/WCButton'

import { Sid } from '@sport/components/WorldCupModule/constants'

const Transient = () => {
  const { category } = useParams<{ category: string }>()
  const { dates, loading } = useDateListContext()

  useEffect(() => {
    if (loading && dates.length > 0) {
      const path = parsePath({ category, interval: dates[0] })
      path && history.replace(path)
    }
  }, [loading, dates, category])

  return (
    <>
      <SimpleHeader category={category} ballType={Sid[Sid.football]} showOption={false} childComp={null} wcButton={<WCButton />} />
      <ContainerBox>
        <div>
          {loading && <PlaceHolder />}
          {!loading && dates.length === 0 && <Empty />}
        </div>
      </ContainerBox>
    </>
  )
}

export default Transient

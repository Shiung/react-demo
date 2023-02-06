import React, { useEffect, useMemo, useState } from 'react'
import { badgeUrlParse, BadgeType } from '@/utils'
import { DefaultIcon as DeflaultCompetitor } from '@icons/index'

const DefaultImg: React.FC<{ type: BadgeType }> = ({ type }) => {
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const defaultBadge = useMemo(() => badgeUrlParse({ type: type }), [type])

  useEffect(() => {
    let mounted = true
    const ImgObj = new Image()
    ImgObj.src = defaultBadge
    ImgObj.onload = () => {
      if (mounted) setIsLoad(ImgObj.width > 0 && ImgObj.height > 0)
    }

    return () => {
      mounted = false
    }
  }, [defaultBadge])

  const isDefaultCate = type === BadgeType.categories

  return isLoad
    ? <img src={defaultBadge} alt='defaultBadge' />
    : (isDefaultCate ? <img src={require('@img/defaultCategory.png').default} alt='badge' /> : <DeflaultCompetitor />)
}

type Props = {
  imgSrc: string,
  defaultType: BadgeType
}

const BadgeIcon: React.FC<Props> = ({ imgSrc, defaultType }) => {
  const [isLoad, setIsLoad] = useState<boolean>(false)

  useEffect(() => {
    let mounted = true
    const ImgObj = new Image()
    ImgObj.src = imgSrc
    ImgObj.onload = () => {
      if (mounted) setIsLoad(ImgObj.width > 0 && ImgObj.height > 0)
    }

    return () => {
      mounted = false
    }
  }, [imgSrc])

  return (
    <>
      {isLoad ? <img src={imgSrc} alt='badge' /> : <DefaultImg type={defaultType} />}
    </>
  )
}

export default BadgeIcon

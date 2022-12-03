import React, { useEffect, useState } from 'react'

type Props = {
  imgSrc: string,
}

const BadgeIcon: React.FC<Props> = ({ imgSrc }) => {
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
      {isLoad && <img src={imgSrc} alt='badge' />}
    </>
  )
}

export default BadgeIcon

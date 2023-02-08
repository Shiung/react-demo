enum BadgeType {
  /** 區域 id ==> cid */
  categories = 1,
  /** 聯賽 id ==> tid */
  tournaments = 2,
  /** 隊伍 id ==> homeId | awayId */
  competitors = 3,
  /** 國旗(網球國旗) cid ==> homeId | awayId */
  countryflags = 4
}

type PropsType = {
  /**
   * Badge類型:
   * 區域(categories) | 聯賽(tournaments) | 隊伍(competitors)
   */
  type: BadgeType,
  /** 未設定則取預設值, ex: vd001 */
  id?: Number
}

/**
 * 取得 (區域|聯賽|隊伍) icon, 未設定 id 返回預設icon
 * @param {PropsType} props icon Type
 * @returns {string} Absolute Url
 */
const badgeUrlParse = (props: PropsType) => {
  // const badgeBase = getConfig().BE_CDN_URL
  // const vid = getConfig().VENDERID

  // return badgeBase && typeof props.id === 'number'
  //   ? `${badgeBase}/badge/${BadgeType[props.type]}/${props.id}.png`
  //   : (vid ? `${badgeBase}/badge/${BadgeType[props.type]}/${vid}.png` : '')

  switch (props.type) {
    case BadgeType.categories:
      return ''
    case BadgeType.tournaments:
      return ''
    case BadgeType.competitors:
      return ''
    case BadgeType.countryflags:
      return ''
    default:
      return ''
  }
}

export { badgeUrlParse, BadgeType }
// import { getConfig } from '@/config'
import { Sid, worldCupTid, worldCupOrcTid } from './constants'

const isWorldCupGame = ({ sid, tid, orcTid, isOutright }: { sid: Sid; tid: number | string; orcTid?: number; isOutright?: boolean }) => {
  if (sid !== Sid.football) return false
  return isOutright ? orcTid === worldCupOrcTid : tid === worldCupTid
}

enum BadgeType {
  /** 國旗 */
  flag = 1,
  /** 國旗 矩形 */
  flagRect = 2,
  /** 球衣 */
  Jersey = 3
}

const badgeUrlParse = ({ type, id }: { type: BadgeType; id: number }) => {
  const badgeBase = '/' //getConfig().BE_CDN_URL

  return type === BadgeType.flag
    ? `${badgeBase}/badge/wc2022/${id}_d.png`
    : type === BadgeType.flagRect
    ? `${badgeBase}/badge/wc2022/${id}_f.png`
    : `${badgeBase}/badge/wc2022/${id}.png`
}

const parseApiData = (data: any) => {
  return {
    ...data,
    sid: Sid.football,
    count: data?.matches?.length ?? 0
  }
}

export { isWorldCupGame, badgeUrlParse, BadgeType, parseApiData }

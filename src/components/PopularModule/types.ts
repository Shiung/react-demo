import { Sid } from './constants'
import type { IJersry } from './Jersey/types'

type DataObj = {
  sid: Sid,
  vd: string,
  iid: number,
  tid: string,
  tnName: string,
  inplay: boolean,
  series: string, // only籃球
  away: { name: string, id: number, jersey?: IJersry, cid: number },
  home: { name: string, id: number, jersey?: IJersry, cid: number },
  kickoffTime: string,
  kickoffDT: string,
  detail?: any,
  serverTime: string, // api request header 塞進去
}

type PopularList = DataObj[]

export type {
  DataObj,
  PopularList,
}

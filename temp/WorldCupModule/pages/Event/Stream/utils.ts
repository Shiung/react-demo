import { Locale } from '@/types'

const LocalTransferSportradarKey = (lang: string) => {
  switch (lang) {
    case Locale.id_ID: return 'id-id'
    case Locale.ms_MY: return 'ms-my'
    case Locale.vi_VN: return 'vi-vn'
    case Locale.zh_CN: return 'zh-cn'
    case Locale.zh_HK: return 'zh-hk'
    case Locale.ja_JP: return 'ja-jp'
    case Locale.ko_KR: return 'ko-kr'
    case Locale.th_TH: return 'th-th'
    case Locale.hi_IN: return 'hi-in'
    case Locale.en_US:
    default: return 'en-us'
  }
}

export {
  LocalTransferSportradarKey
}

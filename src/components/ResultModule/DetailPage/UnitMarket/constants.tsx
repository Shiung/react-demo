import { LAYOUT } from '@Result/constants' // '@/constants/common'
import { Header1, Header2, Header3, Header4, Header5 } from './Header'
import {
  ColOne,
  ColTwo,
  ColTwo27,
  ColThree,
  ColThree30,
  ColThree32,
  ColThree33,
  ColThree35,
  ColThree36
} from './Content'

/**
 * 賽果總盤 mapping config
 */
export const LayoutMap = {
  /**
  * three col
  */
  [LAYOUT.id_30]: { HeaderComp: null, RowComp: ColThree30 },
  [LAYOUT.id_31]: { HeaderComp: null, RowComp: ColThree },
  [LAYOUT.id_32]: { HeaderComp: Header4, RowComp: ColThree32 },
  [LAYOUT.id_33]: { HeaderComp: null, RowComp: ColThree33 },
  [LAYOUT.id_34]: { HeaderComp: Header4, RowComp: ColThree },
  [LAYOUT.id_35]: { HeaderComp: Header4, RowComp: ColThree35 },
  [LAYOUT.id_36]: { HeaderComp: Header5, RowComp: ColThree36 },
  [LAYOUT.id_531]: { HeaderComp: null, RowComp: ColThree },

  /**
   * two col
   */
  [LAYOUT.id_20]: { HeaderComp: null, RowComp: ColTwo },
  [LAYOUT.id_24]: { HeaderComp: null, RowComp: ColTwo },
  [LAYOUT.id_21]: { HeaderComp: Header1, RowComp: ColTwo },
  [LAYOUT.id_25]: { HeaderComp: Header1, RowComp: ColTwo },
  [LAYOUT.id_22]: { HeaderComp: Header1, RowComp: ColTwo },
  [LAYOUT.id_23]: { HeaderComp: Header1, RowComp: ColTwo },
  [LAYOUT.id_26]: { HeaderComp: null, RowComp: ColTwo },
  [LAYOUT.id_27]: { HeaderComp: Header1, RowComp: ColTwo27 },
  [LAYOUT.id_28]: { HeaderComp: null, RowComp: ColTwo },
  [LAYOUT.id_29]: { HeaderComp: null, RowComp: ColTwo },
  [LAYOUT.id_293]: { HeaderComp: Header2, RowComp: ColTwo },
  [LAYOUT.id_294]: { HeaderComp: Header3, RowComp: ColTwo },
  [LAYOUT.id_520]: { HeaderComp: null, RowComp: ColTwo },
  [LAYOUT.id_521]: { HeaderComp: Header1, RowComp: ColTwo },
  [LAYOUT.id_522]: { HeaderComp: null, RowComp: ColTwo },
  [LAYOUT.id_523]: { HeaderComp: Header1, RowComp: ColTwo },

  /**
   * own col
   */
  [LAYOUT.id_10]: { HeaderComp: null, RowComp: ColOne },
  [LAYOUT.id_11]: { HeaderComp: null, RowComp: ColOne },
  [LAYOUT.id_510]: { HeaderComp: null, RowComp: ColOne },

  /**
   * 預設
   */
  default: { HeaderComp: null, RowComp: ColOne }
}

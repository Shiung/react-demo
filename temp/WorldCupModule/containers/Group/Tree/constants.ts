enum TreeMapConf {
  w49 = 1049,
  w50 = 1050,
  w51 = 1052,
  w52 = 1051,
  w53 = 1053,
  w54 = 1054,
  w55 = 1055,
  w56 = 1056,
  w57 = 1058,
  w58 = 1057,
  w59 = 1060,
  w60 = 1059,
  w61 = 1061,
  w62 = 1062,
  w63 = 1063,
  w64 = 1064,
}

enum LabelConf {
  w16 = 'w16',
  w8 = 'w8',
  w4 = 'w4',
  w1 = 'w1'
}

const LabelPostion: { [key in LabelConf]: { top: number, left: number }} = {
  [LabelConf.w16]: { top: 0, left: 0 },
  [LabelConf.w8]: { top: 60, left: 215 },
  [LabelConf.w4]: { top: 180, left: 435 },
  [LabelConf.w1]: { top: 400, left: 650 },
}

const LabelPostionEvent: { [key in LabelConf]: { topId: string, left: number }} = {
  [LabelConf.w16]: { topId: 'tree16Point', left: 0 },
  [LabelConf.w8]: { topId: 'tree8Point', left: 215 },
  [LabelConf.w4]: { topId: 'tree4Point', left: 435 },
  [LabelConf.w1]: { topId: 'tree1Point', left: 650 },
}

export {
  TreeMapConf,
  LabelConf,
  LabelPostion,
  LabelPostionEvent
}
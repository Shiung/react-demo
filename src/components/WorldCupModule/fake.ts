import type { GameInfo } from './types'
import { RoundConf, StatesConst } from './constants'

export const fakeData: GameInfo[] = [
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178201,
    "statePhase": StatesConst.NON_START, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 0,
    homeName: '',
    awayName: '',
    "awayId": 0,
    "kickOffTime": 1660716475000,
    "roundType": "group",
    "roundGroup": RoundConf.B,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178202,
    "statePhase": StatesConst.NON_START, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 0,
    homeName: '',
    awayName: '',
    "awayId": 0,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 91782022,
    "statePhase": StatesConst.NON_START, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247994,
    homeName: '巴西',
    awayName: '葡萄牙',
    "awayId": 247958,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.B,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 3,
        "away": 3
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178203,
    "statePhase": StatesConst.NON_START, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247968,
    homeName: '比利時',
    awayName: '阿根廷',
    "awayId": 247970,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.C,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178205,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 2553,
    homeName: '韩国',
    awayName: '日本',
    "awayId": 276433,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  }
]

export const fakeData22: GameInfo[] = [
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178201,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247971,
    homeName: '德国',
    awayName: '法国',
    "awayId": 247956,
    "kickOffTime": 1660716475000,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 5
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      // {
      //   "type": "score",
      //   "period": "pk",
      //   "home": 4,
      //   "away": 5
      // }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178202,
    "statePhase": StatesConst.INPLAY, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247971,
    homeName: '德国',
    awayName: '西班牙',
    "awayId": 249513,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 91782022,
    "statePhase": StatesConst.NON_START, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247971,
    homeName: '德国',
    awayName: '葡萄牙',
    "awayId": 247958,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 3,
        "away": 3
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178203,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    homeName: '法国',
    "homeId": 247956,
    awayName: '葡萄牙',
    "awayId": 247958,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178205,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    homeName: '西班牙',
    "homeId": 249513,
    awayName: '法国',
    "awayId": 247956,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178206,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    homeName: '西班牙',
    "homeId": 249513,
    awayName: '葡萄牙',
    "awayId": 247958,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  }
]

export const fakeDataALL: GameInfo[] = [
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178201333,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247971,
    homeName: '德国',
    awayName: '法国',
    "awayId": 247956,
    "kickOffTime": 1660716475000,
    "roundType": "group",
    "roundGroup": RoundConf.C,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178202333,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 10769,
    homeName: '英格兰',
    awayName: '西班牙',
    "awayId": 249513,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.C,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 91782022333,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247994,
    homeName: '巴西',
    awayName: '葡萄牙',
    "awayId": 247958,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.C,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 3,
        "away": 3
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178203333,
    "statePhase": StatesConst.NON_START, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247968,
    homeName: '比利時',
    awayName: '阿根廷',
    "awayId": 247970,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.C,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178205333,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 2553,
    homeName: '韩国',
    awayName: '日本',
    "awayId": 276433,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.C,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178201222,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247971,
    homeName: '德国',
    awayName: '法国',
    "awayId": 247956,
    "kickOffTime": 1660716475000,
    "roundType": "group",
    "roundGroup": RoundConf.B,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178202222,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 10769,
    homeName: '英格兰',
    awayName: '西班牙',
    "awayId": 249513,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.B,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 91782022222,
    "statePhase": StatesConst.NON_START, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247994,
    homeName: '巴西',
    awayName: '葡萄牙',
    "awayId": 247958,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.B,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 3,
        "away": 3
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178203222,
    "statePhase": StatesConst.NON_START, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247968,
    homeName: '比利時',
    awayName: '阿根廷',
    "awayId": 247970,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.B,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178205222,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 2553,
    homeName: '韩国',
    awayName: '日本',
    "awayId": 276433,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.B,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178201,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247971,
    homeName: '德国',
    awayName: '法国',
    "awayId": 247956,
    "kickOffTime": 1660716475000,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178202,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 10769,
    homeName: '英格兰',
    awayName: '西班牙',
    "awayId": 249513,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 91782022,
    "statePhase": StatesConst.NON_START, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247994,
    homeName: '巴西',
    awayName: '葡萄牙',
    "awayId": 247958,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 3,
        "away": 3
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178203,
    "statePhase": StatesConst.NON_START, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 247968,
    homeName: '比利時',
    awayName: '阿根廷',
    "awayId": 247970,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  },
  {
    "sid": 1,
    "tid": 510,
    "cid": 73,
    "iid": 9178205,
    "statePhase": StatesConst.CLOSED, //StatesConst.NON_START, INPLAY, CLOSED
    "homeId": 2553,
    homeName: '韩国',
    awayName: '日本',
    "awayId": 276433,
    "kickOffTime": 1660813173877,
    "roundType": "group",
    "roundGroup": RoundConf.A,
    "roundNumber": "2",
    "roundSort": "w01",
    "scoreList": [
      {
        "type": "score",
        "period": "ft",
        "home": 2,
        "away": 2
      },
      {
        "type": "score",
        "period": "ot",
        "home": 1,
        "away": 1
      },
      {
        "type": "score",
        "period": "pk",
        "home": 4,
        "away": 5
      }
    ]
  }
]


export const fakeData2: { group: RoundConf, matches: GameInfo[] }[] = [
  {
    group: RoundConf.A,
    matches: fakeData
  },
  {
    group: RoundConf.B,
    matches: fakeData
  },
  {
    group: RoundConf.C,
    matches: fakeData
  },
  {
    group: RoundConf.D,
    matches: fakeData
  },
  {
    group: RoundConf.E,
    matches: fakeData
  }
]

export const fakeData3: { group: RoundConf, matches: GameInfo[] }[] = [
  {
    group: RoundConf.A,
    matches: fakeData22
  },
  {
    group: RoundConf.B,
    matches: fakeData22
  },
  {
    group: RoundConf.C,
    matches: fakeData22
  },
  {
    group: RoundConf.D,
    matches: fakeData22
  },
  {
    group: RoundConf.E,
    matches: fakeData22
  },
  {
    group: RoundConf.F,
    matches: fakeData22
  },
  {
    group: RoundConf.G,
    matches: fakeData22
  },
  {
    group: RoundConf.H,
    matches: fakeData22
  }
]

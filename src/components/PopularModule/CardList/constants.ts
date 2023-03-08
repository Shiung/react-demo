import { Sid, simpleType } from '../constants'

const marketConf: { [key in Sid]: { [key in simpleType]: { [key in string]: { market: string, betTargets: string[] } } }} = {
  [Sid.football]: {
    [simpleType.asia]: {
      normal: {
        market: 'ah',
        betTargets: ['h', 'a']
      },
      ot: {
        market: 'ah_ot',
        betTargets: ['h', 'a']
      },
      pk: {
        market: 'ah_pk',
        betTargets: ['h', 'a']
      }
    },
    [simpleType.inter]: {
      normal: {
        market: '1x2',
        betTargets: ['h', 'd', 'a']
      },
      ot: {
        market: '1x2_ot',
        betTargets: ['h', 'd', 'a']
      },
      pk: {
        market: '1x2_pk',
        betTargets: ['h', 'd', 'a']
      }
    }
  },
  [Sid.basketball]: {
    [simpleType.asia]: {
      normal: {
        market: 'ah',
        betTargets: ['h', 'a']
      }
    },
    [simpleType.inter]: {
      normal: {
        market: 'ml',
        betTargets: ['h', 'a']
      }
    }
  },
  [Sid.tennis]: {
    [simpleType.asia]: {
      normal: {
        market: 'ah_fts',
        betTargets: ['h', 'a']
      }
    },
    [simpleType.inter]: {
      normal: {
        market: 'ml',
        betTargets: ['h', 'a']
      }
    }
  },
  [Sid.baseball]: {
    [simpleType.asia]: {
      normal: {
        market: 'ah',
        betTargets: ['a', 'h']
      }
    },
    [simpleType.inter]: {
      normal: {
        market: 'ml',
        betTargets: ['a', 'h']
      }
    }
  }
}

export {
  marketConf
}

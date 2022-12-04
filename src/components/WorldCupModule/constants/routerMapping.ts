/** main route name */
const wouldCupName = 'wcGame'
const wouldCupEventName = 'wcEvent'
const worldCupBallName = 'worldCup'
/** wcGame second route name */
enum PageNameSecond {
  preGameName = 'preGame',
  groupRoundName = 'groupRound',
  eliminateName = 'eliminate'
}

/** wcGame third route name */
enum PageNameThird {
  scheduleName = 'schedule',
  grouppingName = 'groupping',
  chartName = 'chart',
  scoreName = 'score'
}

/** wcEvent second route name */
enum PageNameEventSecond {
  info = 'info',
  stream = 'stream',
  character = 'character',
  voteResult = 'voteResult'
}

enum PageVoteResultName {
  roundOf32 = 'roundOf32',
  roundOf16 = 'roundOf16'
}

const RouterPathConf = {
  /** 世界盃賽程專區 */
  game: {
    preGame: {
      name: PageNameSecond.preGameName,
      path: `/${wouldCupName}/${PageNameSecond.preGameName}`,
      i18n: '預選賽', //'worldCup.pqualifier',
      children: [
        {
          name: PageNameThird.scheduleName,
          i18n: '時程表',//'worldCup.schedule',
          path: `/${wouldCupName}/${PageNameSecond.preGameName}/${PageNameThird.scheduleName}`
        },
        {
          name: PageNameThird.grouppingName,
          i18n: '樹狀圖',//'worldCup.groupTable',
          path: `/${wouldCupName}/${PageNameSecond.preGameName}/${PageNameThird.grouppingName}`
        }
      ]
    },
    groupRound: {
      name: PageNameSecond.groupRoundName,
      path: `/${wouldCupName}/${PageNameSecond.groupRoundName}`,
      i18n: '分組賽',//'worldCup.groupMatch',
      children: [
        {
          name: PageNameThird.scheduleName,
          i18n: '時程表',//'worldCup.schedule',
          path: `/${wouldCupName}/${PageNameSecond.groupRoundName}/${PageNameThird.scheduleName}`
        },
        {
          name: PageNameThird.grouppingName,
          i18n: '小組表', //'worldCup.groupTable',
          path: `/${wouldCupName}/${PageNameSecond.groupRoundName}/${PageNameThird.grouppingName}`
        },
        {
          name: PageNameThird.chartName,
          i18n: '樹狀圖',//'worldCup.tree',
          path: `/${wouldCupName}/${PageNameSecond.groupRoundName}/${PageNameThird.chartName}`
        },
        {
          name: PageNameThird.scoreName,
          i18n: '積分表',//'worldCup.pointTable',
          path: `/${wouldCupName}/${PageNameSecond.groupRoundName}/${PageNameThird.scoreName}`
        }
      ]
    },
    eliminate: {
      name: PageNameSecond.eliminateName,
      path: `/${wouldCupName}/${PageNameSecond.eliminateName}`,
      i18n: '淘汰賽',//'worldCup.knockout',
      children: [
        {
          name: PageNameThird.scheduleName,
          i18n: '時程表',//'worldCup.schedule',
          path: `/${wouldCupName}/${PageNameSecond.eliminateName}/${PageNameThird.scheduleName}`
        },
        {
          name: PageNameThird.chartName,
          i18n: '樹狀圖',//'worldCup.tree',
          path: `/${wouldCupName}/${PageNameSecond.eliminateName}/${PageNameThird.chartName}`
        }
      ]
    }
  },

   /** 世界盃賽事專區 */
  event: {
    info: {
      name: PageNameEventSecond.info,
      i18n: '赛程资讯', //'worldCup.gameInfoTab',
      path: `/${wouldCupEventName}/${PageNameEventSecond.info}`,
      children: [
        {
          name: PageNameSecond.preGameName,
          path: `/${wouldCupEventName}/${PageNameEventSecond.info}/${PageNameSecond.preGameName}`,
          i18n: '预选赛',//'worldCup.pqualifier',
          children: [
            {
              name: PageNameThird.scheduleName,
              i18n: '時程表', //'worldCup.schedule',
              path: `/${wouldCupEventName}/${PageNameEventSecond.info}/${PageNameSecond.preGameName}/${PageNameThird.scheduleName}`,
            },
            {
              name: PageNameThird.grouppingName,
              i18n: '樹狀圖',//'worldCup.groupTable',
              path: `/${wouldCupEventName}/${PageNameEventSecond.info}/${PageNameSecond.preGameName}/${PageNameThird.grouppingName}`,
            }
          ]
        },
        {
          name: PageNameSecond.groupRoundName,
          path: `/${wouldCupEventName}/${PageNameEventSecond.info}/${PageNameSecond.groupRoundName}`,
          i18n: '分组赛', //'worldCup.groupMatch',
          children: [
            {
              name: PageNameThird.scheduleName,
              i18n: '時程表',//'worldCup.schedule',
              path: `/${wouldCupEventName}/${PageNameEventSecond.info}/${PageNameSecond.groupRoundName}/${PageNameThird.scheduleName}`,
            },
            {
              name: PageNameThird.grouppingName,
              i18n: '小組表', //'worldCup.groupTable',
              path: `/${wouldCupEventName}/${PageNameEventSecond.info}/${PageNameSecond.groupRoundName}/${PageNameThird.grouppingName}`,
            },
            {
              name: PageNameThird.chartName,
              i18n: '樹狀圖',//'worldCup.tree',
              path: `/${wouldCupEventName}/${PageNameEventSecond.info}/${PageNameSecond.groupRoundName}/${PageNameThird.chartName}`,
            },
          ]
        },
        {
          name: PageNameSecond.eliminateName,
          path: `/${wouldCupEventName}/${PageNameEventSecond.info}/${PageNameSecond.eliminateName}`,
          i18n: '淘汰赛', //'worldCup.knockout',
          children: [
            {
              name: PageNameThird.scheduleName,
              i18n: '時程表',//'worldCup.schedule',
              path: `/${wouldCupEventName}/${PageNameEventSecond.info}/${PageNameSecond.eliminateName}/${PageNameThird.scheduleName}`,
            },
            {
              name: PageNameThird.chartName,
              i18n: '樹狀圖',//'worldCup.tree',
              path: `/${wouldCupEventName}/${PageNameEventSecond.info}/${PageNameSecond.eliminateName}/${PageNameThird.chartName}`,
            },
          ]
        }
      ]
    },
    stream: {
      name: PageNameEventSecond.stream,
      i18n: 'worldCup.streamTab',
      path: `/${wouldCupEventName}/${PageNameEventSecond.stream}`
    },
    character: {
      name: PageNameEventSecond.character,
      i18n: 'worldCup.platformTab',
      path: `/${wouldCupEventName}/${PageNameEventSecond.character}`
    },
    voteResult: {
      name: PageNameEventSecond.voteResult,
      i18n: '',
      path: `/${wouldCupEventName}/${PageNameEventSecond.voteResult}`,
      children: [
        {
          name: PageVoteResultName.roundOf32,
          path: `/${wouldCupEventName}/${PageNameEventSecond.voteResult}/${PageVoteResultName.roundOf32}`,
          i18n: '',
        },
        {
          name: PageVoteResultName.roundOf16,
          path: `/${wouldCupEventName}/${PageNameEventSecond.voteResult}/${PageVoteResultName.roundOf16}`,
          i18n: '',
        },
      ]
    }
  }
}

export {
  PageNameSecond,
  PageNameThird,
  PageNameEventSecond,
  PageVoteResultName,
  wouldCupName,
  worldCupBallName,
  wouldCupEventName,
  RouterPathConf
}

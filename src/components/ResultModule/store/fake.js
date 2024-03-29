export const marketSetting = {
  "basketball": {},
  "baseball": {},
  "tennis": {},
  "football": {
    "ou": {
      "id": "ou",
      "sid": 1,
      "name": "進球:大/小",
      "labels": [
        "pop",
        "tg"
      ],
      "priority": 5,
      "layout": 22,
      "layoutPC": 51,
      "withCondition": true,
      "withPrincipal": false,
      "expanded": true,
      "cashoutSetting": true,
      "betScoreType": "score",
      "mkPeriod": "ft",
      "mkScoreType": "score",
      "betOn": [
        {
          "key": "ov",
          "display": "大"
        },
        {
          "key": "ud",
          "display": "小"
        }
      ]
    },
    "ah": {
      "id": "ah",
      "sid": 1,
      "name": "讓球",
      "labels": [
        "pop",
        "ah"
      ],
      "priority": 2,
      "layout": 21,
      "layoutPC": 50,
      "withCondition": true,
      "withPrincipal": false,
      "expanded": true,
      "cashoutSetting": true,
      "betScoreType": "score",
      "mkPeriod": "ft",
      "mkScoreType": "score",
      "betOn": [
        {
          "key": "h",
          "display": "%home%"
        },
        {
          "key": "a",
          "display": "%away%"
        }
      ]
    },
    "1x2": {
      "id": "1x2",
      "sid": 1,
      "name": "獨贏",
      "labels": [
        "pop"
      ],
      "priority": 1,
      "layout": 31,
      "layoutPC": 52,
      "withCondition": false,
      "withPrincipal": true,
      "expanded": true,
      "cashoutSetting": true,
      "betScoreType": "score",
      "mkPeriod": "ft",
      "mkScoreType": "score",
      "betOn": [
        {
          "key": "h",
          "display": "%home%"
        },
        {
          "key": "d",
          "display": "和局"
        },
        {
          "key": "a",
          "display": "%away%"
        }
      ]
    },
    "oe_1st": {
      "id": "oe_1st",
      "sid": 1,
      "name": "進球:單/雙-上半場",
      "labels": [
        "pop",
        "tg",
        "1st"
      ],
      "priority": 24,
      "layout": 20,
      "layoutPC": 22,
      "withCondition": false,
      "withPrincipal": false,
      "expanded": false,
      "cashoutSetting": true,
      "betScoreType": "score",
      "mkPeriod": "ht",
      "mkScoreType": "score",
      "betOn": [
        {
          "key": "od",
          "display": "單"
        },
        {
          "key": "ev",
          "display": "雙"
        }
      ]
    },
    "1x2&btts": {
      "id": "1x2&btts",
      "sid": 1,
      "name": "獨贏及雙方球隊進球",
      "labels": [
        "pop",
        "tg"
      ],
      "priority": 36,
      "layout": 10,
      "layoutPC": 32,
      "withCondition": false,
      "withPrincipal": true,
      "expanded": false,
      "cashoutSetting": true,
      "betScoreType": "score",
      "mkPeriod": "ft",
      "mkScoreType": "score",
      "betOn": [
        {
          "key": "h&y",
          "display": "%home% - 是"
        },
        {
          "key": "h&n",
          "display": "%home% - 不是"
        },
        {
          "key": "d&y",
          "display": "和局 - 是"
        },
        {
          "key": "d&n",
          "display": "和局 - 不是"
        },
        {
          "key": "a&y",
          "display": "%away% - 是"
        },
        {
          "key": "a&n",
          "display": "%away% - 不是"
        }
      ]
    },
    "ou&btts": {
      "id": "ou&btts",
      "sid": 1,
      "name": "進球:大/小及雙方球隊進球",
      "labels": [
        "pop",
        "tg"
      ],
      "priority": 37,
      "layout": 10,
      "layoutPC": 41,
      "withCondition": true,
      "withPrincipal": true,
      "expanded": false,
      "cashoutSetting": true,
      "betScoreType": "score",
      "mkPeriod": "ft",
      "mkScoreType": "score",
      "betOn": [
        {
          "key": "ov&y",
          "display": "大 %k% - 是"
        },
        {
          "key": "ud&y",
          "display": "小 %k% - 是"
        },
        {
          "key": "ov&n",
          "display": "大 %k% - 不是"
        },
        {
          "key": "ud&n",
          "display": "小 %k% - 不是"
        }
      ]
    },
    "cs_1st": {
      "id": "cs_1st",
      "sid": 1,
      "name": "波膽-上半場",
      "labels": [
        "pop",
        "tg",
        "1st"
      ],
      "priority": 11,
      "layout": 32,
      "layoutPC": 53,
      "withCondition": false,
      "withPrincipal": true,
      "expanded": false,
      "cashoutSetting": true,
      "betScoreType": "score",
      "mkPeriod": "ht",
      "mkScoreType": "score",
      "betOn": [
        {
          "key": "0-0",
          "display": "0-0"
        },
        {
          "key": "1-0",
          "display": "1-0"
        },
        {
          "key": "1-1",
          "display": "1-1"
        },
        {
          "key": "0-1",
          "display": "0-1"
        },
        {
          "key": "2-0",
          "display": "2-0"
        },
        {
          "key": "2-1",
          "display": "2-1"
        },
        {
          "key": "2-2",
          "display": "2-2"
        },
        {
          "key": "1-2",
          "display": "1-2"
        },
        {
          "key": "0-2",
          "display": "0-2"
        },
        {
          "key": "3-0",
          "display": "3-0"
        },
        {
          "key": "3-1",
          "display": "3-1"
        },
        {
          "key": "3-2",
          "display": "3-2"
        },
        {
          "key": "3-3",
          "display": "3-3"
        },
        {
          "key": "2-3",
          "display": "2-3"
        },
        {
          "key": "1-3",
          "display": "1-3"
        },
        {
          "key": "0-3",
          "display": "0-3"
        },
        {
          "key": "4-0",
          "display": "4-0"
        },
        {
          "key": "4-1",
          "display": "4-1"
        },
        {
          "key": "4-2",
          "display": "4-2"
        },
        {
          "key": "4-3",
          "display": "4-3"
        },
        {
          "key": "4-4",
          "display": "4-4"
        },
        {
          "key": "3-4",
          "display": "3-4"
        },
        {
          "key": "2-4",
          "display": "2-4"
        },
        {
          "key": "1-4",
          "display": "1-4"
        },
        {
          "key": "0-4",
          "display": "0-4"
        },
        {
          "key": "0-5",
          "display": "0-5"
        },
        {
          "key": "1-5",
          "display": "1-5"
        },
        {
          "key": "2-5",
          "display": "2-5"
        },
        {
          "key": "3-5",
          "display": "3-5"
        },
        {
          "key": "4-5",
          "display": "4-5"
        },
        {
          "key": "5-5",
          "display": "5-5"
        },
        {
          "key": "5-0",
          "display": "5-0"
        },
        {
          "key": "5-1",
          "display": "5-1"
        },
        {
          "key": "5-2",
          "display": "5-2"
        },
        {
          "key": "5-3",
          "display": "5-3"
        },
        {
          "key": "5-4",
          "display": "5-4"
        },
        {
          "key": "other3",
          "display": "其它比分"
        },
        {
          "key": "other4",
          "display": "其它比分"
        },
        {
          "key": "other5",
          "display": "其它比分"
        },
        {
          "key": "other6",
          "display": "其它比分"
        },
        {
          "key": "other7",
          "display": "其它比分"
        }
      ]
    },
    "a-ou": {
      "id": "a-ou",
      "sid": 1,
      "name": "%away% 進球:大/小",
      "labels": [
        "pop",
        "tg"
      ],
      "priority": 20,
      "layout": 22,
      "layoutPC": 21,
      "withCondition": true,
      "withPrincipal": false,
      "expanded": true,
      "cashoutSetting": false,
      "betScoreType": "score",
      "mkPeriod": "ft",
      "mkScoreType": "score",
      "betOn": [
        {
          "key": "ov",
          "display": "大"
        },
        {
          "key": "ud",
          "display": "小"
        }
      ]
    }
  }
}
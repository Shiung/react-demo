export enum SportID {
  football = 1,
  basketball = 2,
  tennis = 3,
  baseball = 4
}

type Position = {
  distance: number
  ballWidth: number
  boardWidth: number
  boradHeight: number | string
  ballTop: number

}

export const AnimateConf: Record<keyof typeof SportID, Record<string | number, Position>> = {
  football: {
    default: { distance: 160, ballWidth: 32, boardWidth: 375, boradHeight: 79, ballTop: 10 },
    599: { distance: 160, ballWidth: 32, boardWidth: 375, boradHeight: 79, ballTop: 10 },
    750: { distance: 190, ballWidth: 32, boardWidth: 500, boradHeight: 'auto', ballTop: 25 },
    1300: { distance: 200, ballWidth: 32, boardWidth: 560, boradHeight: 'auto', ballTop: 30 }
  },
  basketball: {
    default: { distance: 160, ballWidth: 32, boardWidth: 375, boradHeight: 75, ballTop: 10 },
    599: { distance: 160, ballWidth: 32, boardWidth: 375, boradHeight: 75, ballTop: 10 },
    750: { distance: 190, ballWidth: 32, boardWidth: 500, boradHeight: 'auto', ballTop: 35 },
    1300: { distance: 200, ballWidth: 32, boardWidth: 560, boradHeight: 'auto', ballTop: 40 }
  },
  tennis: {
    default: { distance: 160, ballWidth: 32, boardWidth: 375, boradHeight: 79, ballTop: 10 },
    599: { distance: 160, ballWidth: 32, boardWidth: 375, boradHeight: 79, ballTop: 10 },
    750: { distance: 190, ballWidth: 32, boardWidth: 500, boradHeight: 'auto', ballTop: 25 },
    1300: { distance: 200, ballWidth: 32, boardWidth: 560, boradHeight: 'auto', ballTop: 30 }
  },
  baseball: {
    default: { distance: 165, ballWidth: 25, boardWidth: 375, boradHeight: 79, ballTop: 15 },
    599: { distance: 165, ballWidth: 25, boardWidth: 375, boradHeight: 79, ballTop: 15 },
    750: { distance: 190, ballWidth: 32, boardWidth: 500, boradHeight: 'auto', ballTop: 25 },
    1300: { distance: 200, ballWidth: 32, boardWidth: 560, boradHeight: 'auto', ballTop: 30 }
  }
}

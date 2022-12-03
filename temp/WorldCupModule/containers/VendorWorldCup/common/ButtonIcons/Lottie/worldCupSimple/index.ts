import worldcup from './images/worldcup.png'
import worldcup01 from './images/worldcup01.png'
import worldcup02 from './images/worldcup02.png'

const data = {
  v: '5.9.1',
  fr: 30,
  ip: 0,
  op: 30,
  w: 100,
  h: 80,
  nm: 'worldcup_6686_app',
  ddd: 0,
  assets: [
    {
      id: 'image_0',
      w: 120,
      h: 120,
      u: '',
      p: worldcup,
      e: 0
    },
    {
      id: 'image_1',
      w: 120,
      h: 120,
      u: '',
      p: worldcup01,
      e: 0
    },
    {
      id: 'image_2',
      w: 120,
      h: 120,
      u: '',
      p: worldcup02,
      e: 0
    }
  ],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 2,
      nm: 'worldcup.png',
      cl: 'png',
      refId: 'image_0',
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: {
          s: true,
          x: { a: 0, k: 50, ix: 3 },
          y: {
            a: 1,
            k: [
              {
                i: { x: [0.851], y: [0.287] },
                o: { x: [0.564], y: [0.007] },
                t: 0,
                s: [40]
              },
              {
                i: { x: [0.94], y: [0.543] },
                o: { x: [0.871], y: [-0.009] },
                t: 7,
                s: [34]
              },
              {
                i: { x: [0.933], y: [0.635] },
                o: { x: [0.626], y: [0.003] },
                t: 12,
                s: [45]
              },
              {
                i: { x: [0.9], y: [0.426] },
                o: { x: [0.847], y: [-0.001] },
                t: 19,
                s: [34]
              },
              { t: 22, s: [40] }
            ],
            ix: 4
          }
        },
        a: { a: 0, k: [60, 60, 0], ix: 1, l: 2 },
        s: {
          a: 1,
          k: [
            {
              i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] },
              o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] },
              t: 0,
              s: [67.5, 67.5, 100]
            },
            {
              i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 1] },
              o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
              t: 7,
              s: [62.5, 77.5, 100]
            },
            {
              i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] },
              o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] },
              t: 10,
              s: [66.5, 67.5, 100]
            },
            {
              i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 1] },
              o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
              t: 12,
              s: [77.5, 62.5, 100]
            },
            {
              i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 1] },
              o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] },
              t: 19,
              s: [62.5, 77.5, 100]
            },
            {
              i: { x: [0.833, 0.833, 0.833], y: [0.833, 0.833, 0.833] },
              o: { x: [0.167, 0.167, 0.167], y: [0.167, 0.167, 0.167] },
              t: 21,
              s: [66.5, 67.5, 100]
            },
            { t: 22, s: [67.5, 67.5, 100] }
          ],
          ix: 6,
          l: 2
        }
      },
      ao: 0,
      ip: 0,
      op: 30,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 2,
      nm: 'worldcup01.png',
      cl: 'png',
      parent: 1,
      refId: 'image_1',
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: {
          a: 1,
          k: [
            {
              i: { x: [0.833], y: [0.833] },
              o: { x: [0.167], y: [0.167] },
              t: 12,
              s: [90]
            },
            { t: 19, s: [0] }
          ],
          ix: 10
        },
        p: { a: 0, k: [60, 60, 0], ix: 2, l: 2 },
        a: { a: 0, k: [60, 60, 0], ix: 1, l: 2 },
        s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
      },
      ao: 0,
      ef: [
        {
          ty: 20,
          nm: 'Tint',
          np: 6,
          mn: 'ADBE Tint',
          ix: 1,
          en: 1,
          ef: [
            {
              ty: 2,
              nm: 'Map Black To',
              mn: 'ADBE Tint-0001',
              ix: 1,
              v: { a: 0, k: [1, 1, 1, 1], ix: 1 }
            },
            {
              ty: 2,
              nm: 'Map White To',
              mn: 'ADBE Tint-0002',
              ix: 2,
              v: { a: 0, k: [1, 1, 1, 0], ix: 2 }
            },
            {
              ty: 0,
              nm: 'Amount to Tint',
              mn: 'ADBE Tint-0003',
              ix: 3,
              v: { a: 0, k: 100, ix: 3 }
            },
            { ty: 6, nm: '', mn: 'ADBE Tint-0004', ix: 4, v: 0 }
          ]
        }
      ],
      ip: 12,
      op: 30,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 3,
      ty: 2,
      nm: 'worldcup02.png',
      cl: 'png',
      parent: 1,
      refId: 'image_2',
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: {
          a: 1,
          k: [
            {
              i: { x: [0.833], y: [0.833] },
              o: { x: [0.167], y: [0.167] },
              t: 12,
              s: [-90]
            },
            { t: 19, s: [0] }
          ],
          ix: 10
        },
        p: { a: 0, k: [60, 60, 0], ix: 2, l: 2 },
        a: { a: 0, k: [60, 60, 0], ix: 1, l: 2 },
        s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
      },
      ao: 0,
      ef: [
        {
          ty: 20,
          nm: 'Tint',
          np: 6,
          mn: 'ADBE Tint',
          ix: 1,
          en: 1,
          ef: [
            {
              ty: 2,
              nm: 'Map Black To',
              mn: 'ADBE Tint-0001',
              ix: 1,
              v: { a: 0, k: [1, 1, 1, 1], ix: 1 }
            },
            {
              ty: 2,
              nm: 'Map White To',
              mn: 'ADBE Tint-0002',
              ix: 2,
              v: { a: 0, k: [1, 1, 1, 0], ix: 2 }
            },
            {
              ty: 0,
              nm: 'Amount to Tint',
              mn: 'ADBE Tint-0003',
              ix: 3,
              v: { a: 0, k: 100, ix: 3 }
            },
            { ty: 6, nm: '', mn: 'ADBE Tint-0004', ix: 4, v: 0 }
          ]
        }
      ],
      ip: 12,
      op: 30,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 4,
      ty: 2,
      nm: 'worldcup01.png',
      cl: 'png',
      parent: 1,
      refId: 'image_1',
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: {
          a: 1,
          k: [
            {
              i: { x: [0.833], y: [0.833] },
              o: { x: [0.167], y: [0.167] },
              t: 0,
              s: [0]
            },
            { t: 7, s: [90] }
          ],
          ix: 10
        },
        p: { a: 0, k: [60, 60, 0], ix: 2, l: 2 },
        a: { a: 0, k: [60, 60, 0], ix: 1, l: 2 },
        s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
      },
      ao: 0,
      ip: 0,
      op: 7,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 5,
      ty: 2,
      nm: 'worldcup02.png',
      cl: 'png',
      parent: 1,
      refId: 'image_2',
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: {
          a: 1,
          k: [
            {
              i: { x: [0.833], y: [0.833] },
              o: { x: [0.167], y: [0.167] },
              t: 0,
              s: [0]
            },
            { t: 7, s: [-90] }
          ],
          ix: 10
        },
        p: { a: 0, k: [60, 60, 0], ix: 2, l: 2 },
        a: { a: 0, k: [60, 60, 0], ix: 1, l: 2 },
        s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
      },
      ao: 0,
      ip: 0,
      op: 7,
      st: 0,
      bm: 0
    }
  ],
  markers: []
}

export default data

import ball from './images/ball.png'
import shadow from './images/shadow.png'

const data = {
  v: '5.9.1',
  fr: 29.9700012207031,
  ip: 0,
  op: 72.0000029326201,
  w: 750,
  h: 172,
  nm: 'ball_soccer_all',
  ddd: 0,
  assets: [
    {
      id: 'image_0',
      w: 60,
      h: 60,
      u: '',
      p: ball,
      e: 0
    },
    {
      id: 'image_1',
      w: 100,
      h: 30,
      u: '',
      p: shadow,
      e: 0
    },
    {
      id: 'comp_0',
      nm: 'ball_soccer_right',
      fr: 29.9700012207031,
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 2,
          nm: 'ball.png',
          cl: 'png',
          refId: 'image_0',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: {
              a: 1,
              k: [
                {
                  i: { x: [0.915], y: [1.003] },
                  o: { x: [0.167], y: [0.167] },
                  t: 0,
                  s: [0]
                },
                { t: 35.0000014255792, s: [360] }
              ],
              ix: 10
            },
            p: {
              s: true,
              x: {
                a: 1,
                k: [
                  {
                    i: { x: [0.991], y: [0.833] },
                    o: { x: [0.009], y: [0.167] },
                    t: 0,
                    s: [248.5]
                  },
                  { t: 35.0000014255792, s: [492.5] }
                ],
                ix: 3
              },
              y: { a: 0, k: 66.2, ix: 4 }
            },
            a: { a: 0, k: [30, 30, 0], ix: 1, l: 2 },
            s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
          },
          ao: 0,
          ip: 0,
          op: 36.0000014663101,
          st: 0,
          bm: 0
        },
        {
          ddd: 0,
          ind: 2,
          ty: 2,
          nm: 'shadow.png',
          cl: 'png',
          refId: 'image_1',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              s: true,
              x: {
                a: 1,
                k: [
                  {
                    i: { x: [0.991], y: [0.833] },
                    o: { x: [0.009], y: [0.167] },
                    t: 0,
                    s: [279]
                  },
                  { t: 35.0000014255792, s: [523] }
                ],
                ix: 3
              },
              y: { a: 0, k: 88.2, ix: 4 }
            },
            a: { a: 0, k: [50, 15, 0], ix: 1, l: 2 },
            s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
          },
          ao: 0,
          ip: 0,
          op: 36.0000014663101,
          st: -26.0000010590017,
          bm: 0
        }
      ]
    },
    {
      id: 'comp_1',
      nm: 'ball_soccer_left',
      fr: 29.9700012207031,
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 2,
          nm: 'ball.png',
          cl: 'png',
          refId: 'image_0',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: {
              a: 1,
              k: [
                {
                  i: { x: [0.916], y: [0.995] },
                  o: { x: [0.167], y: [0.167] },
                  t: 0,
                  s: [360]
                },
                { t: 35.0000014255792, s: [0] }
              ],
              ix: 10
            },
            p: {
              s: true,
              x: {
                a: 1,
                k: [
                  {
                    i: { x: [0.991], y: [0.833] },
                    o: { x: [0.009], y: [0.167] },
                    t: 0,
                    s: [492.5]
                  },
                  { t: 35.0000014255792, s: [248.5] }
                ],
                ix: 3
              },
              y: { a: 0, k: 66.25, ix: 4 }
            },
            a: { a: 0, k: [30, 30, 0], ix: 1, l: 2 },
            s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
          },
          ao: 0,
          ip: 0,
          op: 36.0000014663101,
          st: 0,
          bm: 0
        },
        {
          ddd: 0,
          ind: 2,
          ty: 2,
          nm: 'shadow.png',
          cl: 'png',
          refId: 'image_1',
          sr: 1,
          ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: {
              s: true,
              x: {
                a: 1,
                k: [
                  {
                    i: { x: [0.991], y: [0.833] },
                    o: { x: [0.009], y: [0.167] },
                    t: 0,
                    s: [523]
                  },
                  { t: 35.0000014255792, s: [279] }
                ],
                ix: 3
              },
              y: { a: 0, k: 88.25, ix: 4 }
            },
            a: { a: 0, k: [50, 15, 0], ix: 1, l: 2 },
            s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
          },
          ao: 0,
          ip: 0,
          op: 36.0000014663101,
          st: -26.0000010590017,
          bm: 0
        }
      ]
    }
  ],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 0,
      nm: 'ball_soccer_right',
      refId: 'comp_0',
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [375, 86, 0], ix: 2, l: 2 },
        a: { a: 0, k: [375, 86, 0], ix: 1, l: 2 },
        s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
      },
      ao: 0,
      w: 750,
      h: 172,
      ip: 0,
      op: 36.0000014663101,
      st: 0,
      bm: 0
    },
    {
      ddd: 0,
      ind: 2,
      ty: 0,
      nm: 'ball_soccer_left',
      refId: 'comp_1',
      sr: 1,
      ks: {
        o: { a: 0, k: 100, ix: 11 },
        r: { a: 0, k: 0, ix: 10 },
        p: { a: 0, k: [375, 86, 0], ix: 2, l: 2 },
        a: { a: 0, k: [375, 86, 0], ix: 1, l: 2 },
        s: { a: 0, k: [100, 100, 100], ix: 6, l: 2 }
      },
      ao: 0,
      w: 750,
      h: 172,
      ip: 36.0000014663101,
      op: 72.0000029326201,
      st: 36.0000014663101,
      bm: 0
    }
  ],
  markers: []
}

export default data

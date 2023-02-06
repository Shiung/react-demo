# 賽果

# router
```bash
|--LeaguePage
|--TournamentPage
|--DetailPage
```

# 元件
Layout
  所有頁面呈現的版面

TopHeader (BallMenu/ Selector / SearchBar)
-  1. Selector -> 容器獨立化 (React.cloneElement)
-  2. searchBar -> input event
-  React.forwardRef 使用跨組建建立 useRef

store
-  核心資料處理

DetailPage
-  /UnitMarket 盤口對照表 以及盤口處理
-  /scoreBall -> Carousel 自製slide 功能透過event


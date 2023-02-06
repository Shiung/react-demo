/**
 * 全場加上加時比分
 * 簡易 / 總盤 header 顯示比分(足球)
 */
const parseTotalScore = (ftArr: string[], otArr: string[]) => {
  const rule = (sum: string, curr: string) => {
    if (!curr) return sum
    return sum ? (Number(sum) + Number(curr)).toString() : curr
  }

  const home = [ftArr[0], otArr[0]].reduce(rule, '')
  const away = [ftArr[1], otArr[1]].reduce(rule, '')

  return home && away ? [home, away].join('-') : ''
}

export {
  parseTotalScore
}

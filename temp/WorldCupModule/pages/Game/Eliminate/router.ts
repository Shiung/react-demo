import { lazy } from 'react'
import { RouterPathConf } from '@sport/components/WorldCupModule/constants'

const reBindComponentPath = (s: string) => s.slice(0, 1).toUpperCase() + s.slice(1)

export const routes = RouterPathConf.game.eliminate.children.map((r) => {
  const componentPath = reBindComponentPath(r.name)
  return {
    ...r,
    Component: lazy(() => import(`./${componentPath}`)),
    exact: true
  }
})
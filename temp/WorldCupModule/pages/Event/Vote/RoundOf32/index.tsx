import { useMemo } from 'react'
import AwardTable from '../components/AwardTable'
import GroupBox, * as GroupComp from '../components/GroupBox'
import RuleTable from '../components/RuleTable'
import { useData } from '../hooks'

const RoundOf32 = () => {
  const { ls, AwardLs } = useData()
  return (
    <>
      <AwardTable ls={AwardLs} />
      {useMemo(() => {
        return ls.map(({ group, hasBlock, ls }) => (
          <GroupBox
            key={group}
            headerComp={<GroupComp.Header1 group={group} />}
            contentComp={<GroupComp.Content1 ls={ls} />}
            hasBlock={hasBlock} />
        ))
      }, [ls])}
      <RuleTable />
    </>
  )
}

export default RoundOf32

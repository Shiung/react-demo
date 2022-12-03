import AwardTable from '../components/AwardTable'
import GroupBox, * as GroupComp from '../components/GroupBox'
import { useDataFor16 } from '../hooks'

const RoundOf16 = () => {
  const { ls, AwardLs, hasBlock } = useDataFor16()
  return (
    <>
      <AwardTable ls={AwardLs} />
      <GroupBox
        hasBlock={hasBlock}
        is16Win
        headerComp={<GroupComp.Header2 />}
        contentComp={<GroupComp.Content2 ls={ls} />} />
    </>
  )
}

export default RoundOf16

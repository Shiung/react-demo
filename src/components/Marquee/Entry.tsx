import Marquee from './index'

const list = [
  'this is for test string1',
  'this is for test string2',
  'this is for test string3',
  'this is for test string4',
]

const Entry = () => {
  return (
    <>
      <Marquee infos={list} cusCss='w-[200px] bg-[#ccc]' />
      <br/>
      <Marquee infos={list} cusCss='bg-[#ccc]' speed={3} />
      <br/>
      <div className='flex justify-end'>
        <Marquee infos={list} cusCss='w-[300px] bg-[#ccc] text-[30px]' />
      </div>

      <br/>
      <Marquee infos={list} cusCss='bg-[#ccc]' speed={2} />
    </>
  )
}

export default Entry

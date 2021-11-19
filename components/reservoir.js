import React from 'react'

const Reservoir = () => {
  return (
    <div className='flex flex-col items-center' >
      <p className='mb-1' >Oroville Lake</p>
      <div className='relative' >

        <div className='bg-gray-200' style={{ height: 100, width: 80 }} >
        </div>
        <div className='absolute z-10' style={{ top: 20 }} >
          <RedLine />
        </div>
        <div className='absolute z-10 bottom-0' >
          <BlueBar />
        </div>

      </div>
    </div>
  )
}

const RedLine = () => {
  return (
    <div className='flex items-center' >
      <div className='bg-red-400' style={{ width: 80, height: 2, marginRight: 10 }} ></div>
      <p className='text-sm' >4125</p>
    </div>
  )
}

const BlueBar = () => {
  return (
    <div className='relative bg-green-400' >
      <p className='text-sm absolute' style={{ marginLeft: 80, top: -10, left: 10 }} >3200</p>
      <div className='bg-blue-400' style={{ width: 80, height: 40 }} >
      </div>
    </div>
  )
}



export default Reservoir

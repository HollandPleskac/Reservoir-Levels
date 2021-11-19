// add borders (improve ui)
import React from 'react'

const Reservoir = () => {
  return (
    <div className='flex flex-col items-center' >
      <p className='mb-1' >Oroville Lake</p>
      <div className='relative' >

        <GrayBackground />
        <div className='absolute z-10' style={{ top: 20, left: -5 }} >
          <RedLine />
        </div>
        <div className='absolute z-10 bottom-0' >
          <BlueBar />
        </div>

      </div>
    </div>
  )
}

const GrayBackground = (params) => {
  return (
    <div className='bg-gray-200 border-2 border-gray-400' style={{ height: 100, width: 80 }} >
      <p className='text-sm absolute' style={{ top: -10, left: -40 }} >4823</p>
      <p className='text-sm absolute' style={{ bottom: -10, left: -15 }} >0</p>
    </div>
  )
}


const RedLine = () => {
  return (
    <div className='flex items-center' >
      <div className='bg-red-400' style={{ width: 90, height: 2, marginRight: 5 }} ></div>
      <p className='text-sm' >4125</p>
    </div>
  )
}

const BlueBar = () => {
  return (
    <div className='relative' >
      <p className='text-sm absolute' style={{ marginLeft: 80, top: -10, left: 10 }} >3200</p>
      <div className='bg-blue-400' style={{ width: 70, height: 40, marginLeft: 5 }} >
      </div>
    </div>
  )
}



export default Reservoir

// add borders (improve ui)
import React from 'react'

const Reservoir = ({ maxHeight, historicalHeight, currentHeight }) => {
  return (
    <div className='flex flex-col items-center' >
      <p className='mb-4 text-lg' >Oroville Lake</p>
      <div className='relative' >
        <GrayBackground />
        <div className='absolute z-10' style={{ top: 40, left: -10 }} >
          <RedLine />
        </div>
        <div className='absolute z-10 bottom-0' >
          <BlueBar />
        </div>

      </div>
    </div>
  )
}

const GrayBackground = () => {
  return (
    <div className='bg-gray-200 border-2 border-gray-400' style={{ height: 200, width: 160 }} >
      <p className='text-sm absolute' style={{ top: -10, left: -40 }} >4823</p>
      <p className='text-sm absolute' style={{ bottom: -10, left: -25 }} >0</p>
    </div >
  )
}


const RedLine = () => {
  return (
    <div className='flex items-center' >
      <div className='bg-red-600' style={{ width: 180, height: 2.5, marginRight: 10 }} ></div>
      <p className='text-sm text-reservoirRed' >4125</p>
    </div>
  )
}

const BlueBar = () => {
  return (
    <div className='relative' >
      <p className='text-sm absolute text-blue-600' style={{ marginLeft: 160, top: -20, left: 20 }} >3200</p>
      <div className='bg-blue-600 border-2 border-gray-400' style={{ width: 140, height: 80, marginLeft: 10 }} >
      </div>
    </div>
  )
}



export default Reservoir

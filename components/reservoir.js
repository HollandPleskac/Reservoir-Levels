import React from 'react'

const Reservoir = ({ maxHeight, historicalHeight, currentHeight, name }) => {
  const historicalPercentage = historicalHeight / maxHeight * 100
  console.log('reservoir historical percent', historicalPercentage)
  // const onePercent = maxHeight * 0.01
  // console.log(onePercent)
  const redBarHeightFromTop = 200 - (historicalPercentage * 2)
  // - onePercent corrects for the fact that the red bar's container pushes it down by roughly 1% - this aligns the red bar perfectly
  console.log("historadskjf;klasdjf;klsadjklfjsdkljfical height", historicalHeight)
  return (
    <div className='flex flex-col items-center' >
      <p className='mb-4 text-lg' >{name}</p>
      <div className='relative' >
        <GrayBackground maxHeight={maxHeight} />
        <div className='absolute z-20' style={{ top: redBarHeightFromTop, left: -10 }} >
          <RedLine historicalHeight={historicalHeight} />
        </div>
        <div className='absolute z-10 bottom-0' >
          <BlueBar currentHeight={currentHeight} maxHeight={maxHeight} />
        </div>

      </div>
    </div>
  )
}

const GrayBackground = ({ maxHeight }) => {
  return (
    <div className='bg-gray-200 border-2 border-gray-400' style={{ height: 200, width: 160 }} >
      <p className='text-sm absolute' style={{ top: -10, left: -40 }} >{maxHeight}</p>
      <p className='text-sm absolute' style={{ bottom: -10, left: -25 }} >0</p>
    </div >
  )
}


const RedLine = ({ historicalHeight }) => {
  return (
    <div className='flex items-center' >
      <div className='bg-red-600' style={{ width: 180, height: 2.5, marginRight: 10 }} ></div>
      <p className='text-sm text-reservoirRed' >{historicalHeight}</p>
    </div>
  )
}

const BlueBar = ({ currentHeight, maxHeight }) => {
  const currentPercentage = currentHeight / maxHeight * 100
  const barHeight = currentPercentage * 2

  return (
    <div className='relative' >
      <p className='text-sm absolute text-blue-600' style={{ marginLeft: 160, top: -10, left: 20 }} >{currentHeight}</p>
      <div className='bg-blue-600 border-2 border-gray-400' style={{ width: 140, height: barHeight, marginLeft: 10 }} >
      </div>
    </div>
  )
}



export default Reservoir

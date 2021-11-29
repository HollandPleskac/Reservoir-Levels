import React, { useContext } from 'react'
import ContractContext from '../context/contractContext'

const SideBar = () => {
  const contractCtx = useContext(ContractContext)

  const isInitialized = contractCtx.donPedroHeight !== null && contractCtx.modestoHeight !== null
  const isAboveHistoricalAvg = contractCtx.donPedroHeight > contractCtx.donPedroHistAvg && contractCtx.modestoHeight > contractCtx.modestoHistAvg
  const color = !isInitialized ? 'white' : isAboveHistoricalAvg ? 'reservoirGreen' : 'reservoirRed'

  return (
    <div className='z-20 bg-white flex-grow w-1/4' style={{ boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.25)" }} >
      <hr className="w-full" />
      <div className='py-6 px-10 w-full' >
        <h1 className='text-xl mb-8' >
          We&apos;re in the <span className={`text-${color}`} >{color === 'reservoirRed' ? 'red!' : 'green!'}</span>
        </h1>
        <StatusInfo color={color} />
        <ConserveInfo />
        <AdditionalResourcesInfo />
      </div>
    </div>
  )
}

const StatusInfo = ({ color }) => {
  let text

  if (color === 'reservoirGreen')
    text = 'The water levels in the Don Pedro and Modesto reservoirs are above historical averages.  Well done.  As a community we’ve worked hard to conserve water.'
  else
    text = 'There water levels in the Don Pedro and Modesto reservoirs are below historical averages.  We need to work together in order to conserve water!'

  return (
    <>
      <h2 className='text-lg mb-2' >What does this mean?</h2>
      <p className={`pr-9`} >{text}</p>
    </>
  )
}

const ConserveInfo = () => {
  return (
    <>
      <h2 className='text-lg mb-2 mt-6' >How to conserve water?</h2>
      <p className='pr-10' >The most effective ways to conserve water include:</p>
      <ul className='mt-2' >
        <li>1. Taking shorter showers</li>
        <li>2. Watering plants at night</li>
        <li>3. Turning offwater when washing dishes</li>
      </ul>
    </>
  )
}

const AdditionalResourcesInfo = () => {
  return (
    <>
      <h2 className='text-lg mb-2 mt-6' >Additional Resources</h2>
      <p className='pr-10' >To learn more about water conservation visit these websites.</p>
      <ul className='mt-2' >
        <li>1. modestowaterdistrict.com</li>
        <li>2. donpedroreservoir.com</li>
        <li>3. modestoreservoir.com</li>
      </ul>
    </>
  )
}



export default SideBar

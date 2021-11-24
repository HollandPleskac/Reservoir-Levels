import React from 'react'

const SideBar = () => {
  return (
    <div className='z-20 bg-white flex-grow w-1/4' style={{ boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.25)" }} >
      <hr className="w-full" />
      <div className='py-6 px-10 w-full' >
        <h1 className='text-xl mb-8' >We&apos;re in the <span className='text-reservoirRed' >red!</span></h1>
        <StatusInfo />
        <ConserveInfo />
        <AdditionalResourcesInfo />
      </div>
    </div>
  )
}

const StatusInfo = () => {
  return (
    <>
      <h2 className='text-lg mb-2' >What does this mean?</h2>
      <p className='pr-9' >There water levels in the Lake Oroville and Trinity Lake reservoirs are below historical averages.  We need to work together in order to conserve water!</p>
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
      <p className='pr-10' >To learn more about water conservation visit these websites.:</p>
      <ul className='mt-2' >
        <li>1. alemendawaterdistrict.com</li>
        <li>2. orovillelake.com</li>
        <li>3. trinitylake.com</li>
      </ul>
    </>
  )
}



export default SideBar

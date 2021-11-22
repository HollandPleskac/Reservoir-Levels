
import React, { useContext } from 'react'
import Reservoir from '../components/Reservoir'
import Header from '../components/Header'

const HomePage = () => {
  return (
    <div className='h-screen flex flex-col items-center' >
      <Header />
      <div className='flex-grow flex w-full' >
        <div className='w-3/4' style={{ backgroundColor: "F4F4F4" }} >
          main content here
          {/* dividing bar at end */}
        </div>
        <div className='z-20 bg-white flex-grow' style={{ boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.25)" }} >
          <hr className="w-full" />
          sidebar content
        </div>
      </div>
    </div>
    // footer
  )
}

const SideBar = (params) => {
  return (
    <div>

    </div>
  )
}


export default HomePage

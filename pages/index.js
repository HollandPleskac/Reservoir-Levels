
import React, { useContext } from 'react'
import Reservoir from '../components/Reservoir'
import Header from '../components/Header'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
      <div className='h-screen flex flex-col items-center' >
        <Header />
        <div className='flex-grow flex w-full' >
          <MainContent />
          <SideBar />
        </div>
      </div>
      <Footer />
    </>
  )
}

const SideBar = (params) => {
  return (
    <div className='z-20 bg-white flex-grow' style={{ boxShadow: "0px 6px 4px rgba(0, 0, 0, 0.25)" }} >
      <hr className="w-full" />
      sidebar content
    </div>
  )
}

const MainContent = (params) => {
  return (
    <div className='w-3/4 flex flex-col justify-between' style={{ backgroundColor: "#F4F4F4" }} >
      <div className='flex-grow' >
        main content here
      </div>
      <div className='w-full bg-white flex justify-center text-lg py-5 shadow-md' >
        Sign up for alerts
      </div>
    </div >
  )
}




export default HomePage

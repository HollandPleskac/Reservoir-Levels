
import React, { useContext } from 'react'
import Reservoir from '../components/Reservoir'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'

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

const MainContent = () => {
  return (
    <div className='w-3/4 flex flex-col justify-between' style={{ backgroundColor: "#F4F4F4" }} >
      <div className='flex flex-col flex-grow' >
        <ProgressBar />
        <div className='flex-grow flex flex-col justify-center' >
          <div className='flex justify-center mb-4' >
            <div className='mr-48' >
              <Reservoir />
            </div>
            <Reservoir />
          </div>
          <NextPayout />
        </div>
      </div>
      <div className='w-full bg-white flex justify-center text-lg py-5 shadow-md' >
        Sign up for alerts
      </div>
    </div >
  )
}

const ProgressBar = () => {
  return (
    <div className='bg-reservoirRed mx-10 py-4 mt-4 text-center text-xl text-white' >
      Almost There
    </div>
  )
}



const NextPayout = () => {
  return (
    <h2 className='w-full text-center text-4xl mt-10' >
      Next Payout: <span className='text-blue-600' >00:00:02</span>
    </h2>
  )
}


export default HomePage

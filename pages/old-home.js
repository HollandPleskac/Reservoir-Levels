import React, { useContext } from 'react'
import Reservoir from '../components/Reservoir'
import Header from '../components/Header'
// import PreviousPayout from '../components/PreviousPayout'

const HomePage = () => {
  return (
    <div className='h-screen flex flex-col items-center' >
      <Header />
      <div className='flex flex-col items-center w-1/2' >
        <ReservoirsDisplay />
        <TimerDisplay />
        <PreviousPayoutsDisplay />
      </div>
    </div>
  )
}

const ReservoirsDisplay = () => {
  return (
    <div className='relative border-2 rounded-lg w-full mt-10' style={{ height: 400 }} >
      <div className='absolute top-16 left-40 ' >
        <Reservoir
          maxHeight={4452}
          historicalHeight={4159}
          currentHeight={3302}
        />
      </div>
      <div className='absolute bottom-16 right-40 ' >
        <Reservoir
          maxHeight={4452}
          historicalHeight={4159}
          currentHeight={3302}
        />
      </div>
    </div>
  )
}

const TimerDisplay = () => {
  return (
    <h2 className='w-full text-center text-4xl mt-10' >
      Next Payout: <span className='text-blue-600' >00:00:02</span>
    </h2>
  )
}

const PreviousPayoutsDisplay = () => {
  return <div className="w-full mt-8" >
    <h1 className='text-xl mb-5' >Previous Payouts</h1>
    <PreviousPayout date="Jan 30, 2020" amount="1" />
    <PreviousPayout date="Jan 30, 2020" amount="1" />
    <PreviousPayout date="Jan 30, 2020" amount="1" />
    <PreviousPayout date="Jan 30, 2020" amount="1" />
  </div>
}

const PreviousPayout = ({ date, amount }) => {
  return (
    <div className='flex mb-4' >
      <div className='bg-blue-600 w-1 mr-4' >
      </div>
      <div className="py-2" >
        <h3 className='mb-1 text-xl' >{date}</h3>
        <p className='text-sm' >Payout of {amount} eth</p>
      </div>
    </div>
  )
}

export default HomePage

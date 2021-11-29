
import React, { useContext, useState, useEffect } from 'react'
import ContractContext from '../context/contractContext'
import { ethers } from 'ethers'
import { useTimer } from 'react-timer-hook';
import Reservoir from '../components/Reservoir'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import AlertsSignup from '../components/AlertsSignup'
import ProgressBar from '../components/ProgressBar'

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
    <div className='w-3/4 flex flex-col justify-between bg-background' >
      <div className='flex flex-col flex-grow' >
        <ProgressBar />
        <div className='flex-grow flex flex-col justify-center' >
          <ReservoirsContainer />
          <NextPayout />
        </div>
      </div>
      <AlertsSignup />
    </div >
  )
}

const ReservoirsContainer = () => {
  const contractCtx = useContext(ContractContext)

  return (
    <div className='flex justify-center mb-4' >
      <div className='mr-48' >
        <Reservoir maxHeight={2030} historicalHeight={contractCtx.donPedroHistAvgHt} currentHeight={contractCtx.donPedroHeight} name='Don Pedro Reservoir' />
      </div>
      <Reservoir maxHeight={952} historicalHeight={contractCtx.modestoHistAvgHt} currentHeight={contractCtx.modestoHeight} name='Modesto Reservoir' />
    </div>
  )
}


const NextPayout = () => {
  const contractCtx = useContext(ContractContext)

  const time = new Date();
  const expT = time.setSeconds(time.getSeconds());
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expT, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    const getCurrentCounter = async () => {
      const c = await contractCtx.getCounter()
      const countersTillPayout = 3 - (c % 3)
      const secondsTillPayout = countersTillPayout * 25 // each counter is 25 seconds

      const time = new Date();
      const expiryTimestamp = time.setSeconds(time.getSeconds() + secondsTillPayout);
      restart(expiryTimestamp)
      console.log("seconds until next payout : ", secondsTillPayout)
    }

    if (contractCtx.contractAddress) {
      getCurrentCounter()
    }
  }, [contractCtx])

  const daysDisplay = days < 10 ? `0${days}` : days
  const hoursDisplay = hours < 10 ? `0${hours}` : hours
  const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes
  const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds

  return (
    <h2 className='w-full text-center text-4xl mt-10' >
      Next Payout: <span className='text-blue-600' >{daysDisplay}:{hoursDisplay}:{minutesDisplay}:{secondsDisplay}</span>
    </h2>
  )
}





export default HomePage

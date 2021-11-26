
import React, { useContext, useState, useEffect } from 'react'
import ContractContext from '../context/contractContext'
import { ethers } from 'ethers'
import Reservoir from '../components/Reservoir'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SideBar from '../components/SideBar'
import AlertsSignup from '../components/AlertsSignup'
import ProgressBar from '../components/ProgressBar'

const decimals = ethers.BigNumber.from(10).pow(18)

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
          <ReservoirsContainer/>
          <NextPayout />
        </div>
      </div>
      <AlertsSignup />
    </div >
  )
}

const ReservoirsContainer = () => {
  const contractCtx = useContext(ContractContext)
  const [orovilleHeight, setOrovilleHeight] = useState()
  const [trinityHeight, setTrinityHeight] = useState()

  useEffect(() => {
    if (contractCtx.contractAddress && contractCtx.Contract) {
      const fetchHeights = async () => {
        const orovilleHt = await contractCtx.getOrovilleLakeHeight()
        const trinityHt = await contractCtx.getTrinityLakeHeight()
        console.log('oroville Height', orovilleHt.div(decimals).toNumber())
        console.log('trinity Height', trinityHt.div(decimals).toNumber())
        setOrovilleHeight(orovilleHt.div(decimals).toNumber())
        setTrinityHeight(trinityHt.div(decimals).toNumber())
      }

      fetchHeights()
    }
  }, [contractCtx])

  return (
    <div className='flex justify-center mb-4' >
      <div className='mr-48' >
        <Reservoir maxHeight={100} historicalHeight={75} currentHeight={orovilleHeight} name='Oroville Lake' />
      </div>
      <Reservoir maxHeight={100} historicalHeight={80} currentHeight={trinityHeight} name='Trinity Lake' />
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

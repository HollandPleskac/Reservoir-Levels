import React, { useContext } from 'react'
import Reservoir from '../components/Reservoir'
import Header from '../components/Header'

const HomePage = () => {
  return (
    <div className='h-screen flex flex-col items-center ' >
      <Header />
      Home Page
      <Reservoir
        name="Lake Oroville"
        maxHeight={4452}
        historicalHeight={4159}
        currentHeight={3302}
      />
    </div>
  )
}

export default HomePage

import React from 'react'
import Reservoir from '../components/reservoir'

const HomePage = () => {
  return (
    <div className='h-screen flex flex-col items-center ' >
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

import React from 'react'


const Footer = (params) => {
  return (
    <div className='z-40 w-full flex justify-center bg-blue-600 py-12' >
      <div className='mr-32' >
        <h2 className='text-white mb-3 text-lg' >Reservoir Levels</h2>
        <p className='text-gray-200 w-48 text-sm' >Reservoir Levels is a blockchain protocol dedicated to conserving water.  We are hoping to use blockchain technology to help conserve water in California.</p>
      </div>
      <div className='mr-32' >
        <h2 className='text-white mb-3 text-lg' >Other</h2>
        <ul className='text-gray-200' >
          <li className='mb-3' >How it works</li>
          <li className='mb-3' >Vision</li>
          <li className='' >Releases</li>
        </ul>
      </div>
      <div>
        <h2 className='text-white mb-3 text-lg' >Legal</h2>
        <ul className='text-gray-200' >
          <li className='mb-3' >Code of conduct</li>
          <li className='mb-3' >Terms of use</li>
          <li className='' >Privacy policy</li>
        </ul>
      </div>
    </div>
  )
}

export default Footer

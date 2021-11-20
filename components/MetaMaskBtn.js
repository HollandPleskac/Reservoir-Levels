import React from 'react'

const MetaMaskBtn = (props) => {
  const connection = props.connection
  console.log('connection', connection)

  const metaMaskBtnHandler = async () => {
    if (connection === 'DISCONNECTED')
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    else if (connection === 'NOT INSTALLED') console.log('not installed')
    else if (connection === 'CONNECTED')
      console.log('Disconnect from MetaMask in the chrome extension')
  }

  return (
    <button
      onClick={metaMaskBtnHandler}
      className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ease-in duration-100'
    >
      {connection === 'DISCONNECTED' && 'Connect to MetaMask'}
      {connection === 'NOT INSTALLED' && 'Install MetaMask'}
      {connection === 'CONNECTED' && 'Connected to MetaMask'}
    </button>
  )
}

export default MetaMaskBtn
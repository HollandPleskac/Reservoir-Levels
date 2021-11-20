import React, { useState, useEffect } from 'react'

const url = 'http://localhost:3000/'
// const url = 'https://{INSERT_PROJECT}.vercel.app/'

const ConnectionContext = React.createContext({
  connection: '',
  account: '',
})

export const ConnectionContextProvider = (props) => {
  const [connection, setConnection] = useState('')
  const [account, setAccount] = useState(null)

  const isMetaMaskInstalled = async () => {
    // if they dont have metamask 'ethereum' doesnt exist, need to use 'window.ethereum'
    if (window.ethereum && window.ethereum.isMetaMask) return true
    return false
  }

  const isMetaMaskConnected = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' })
    if (accounts.length !== 0) return true
    return false
  }

  useEffect(() => {
    // if ( check for contract ) {
    const setConnectionState = async () => {
      if (!(await isMetaMaskInstalled())) {
        setConnection('NOT INSTALLED')
        setAccount(null)
        return
      } else if (await isMetaMaskConnected()) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        setConnection('CONNECTED')
        setAccount(accounts[0])
        return
      } else {
        setConnection('DISCONNECTED')
        setAccount(null)
        return
      }
    }

    setConnectionState() // initial state

    window.ethereum.on('accountsChanged', function (accounts) {
      console.log('accounts changed', accounts)
      setConnectionState()
    })
  }, [])

  const contextValue = {
    connection: connection,
    account: account,
  }

  return (
    <ConnectionContext.Provider value={contextValue}>
      {props.children}
    </ConnectionContext.Provider>
  )
}

export default ConnectionContext
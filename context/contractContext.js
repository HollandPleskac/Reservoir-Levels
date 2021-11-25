import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'

const url = 'http://localhost:3000/'
// const url = 'https://{INSERT_PROJECT}.vercel.app/'

const ContractContext = React.createContext({
  Contract: null,
  contractAddress: null,
  getOrovilleLakeHeight: async () => { },
  getTrinityLakeHeight: async () => {},
})

export const ContractContextProvider = (props) => {

  const [Contract, setContract] = useState(null) // capital Contract refers to the compiled contract (not the abi)
  const [contractAddress, setContractAddress] = useState(null)

  const setContractData = async () => {
    try {
      const contract = await axios.get(`${url}ReservoirLevels.json`).then(res => res.data)  // axios.get returns an http response obj, res.data = HackathonFactory contract
      const address = await axios.get(`${url}ReservoirLevelsAddress.json`).then(res => res.data.address)
      setContract(contract)
      setContractAddress(address)
      console.log('set contract data')
    } catch (e) {
      console.log('err', e)
    }
  }

  useEffect(() => {
    setContractData()
  }, [])

  // get oroville lake height
  const getOrovilleLakeHeight = async () => {
    console.log("getOrovilleLakeHeight called from contractContext")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider)
    try {
      const orovilleHeight = await contract.orovilleLakeHeight()
      console.log('got oroville lake height', orovilleHeight)
      return orovilleHeight
    } catch (e) {
      console.log('error getting account', e)
      return 'error'
    }
  }

  // get trinity lake height
  const getTrinityLakeHeight = async () => {
    console.log("getTrinityLakeHeight called from contractContext")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider)
    try {
      const trinityHeight = await contract.trinityLakeHeight()
      console.log('got oroville lake height', trinityHeight)
      return trinityHeight
    } catch (e) {
      console.log('error getting account', e)
      return 'error'
    }
  }


  // get time left in contract


  return (
    <ContractContext.Provider value={{
      Contract,
      contractAddress,
      getOrovilleLakeHeight,
      getTrinityLakeHeight,
    }} >
      {props.children}
    </ContractContext.Provider>
  )

}

export default ContractContext
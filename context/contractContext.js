import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'

const url = 'http://localhost:3000/'
// const url = 'https://{INSERT_PROJECT}.vercel.app/'
const decimals = ethers.BigNumber.from(10).pow(18)

const ContractContext = React.createContext({
  Contract: null,
  contractAddress: null,
  orovilleHeight: null,
  trinityHeight: null,
  orovilleHistAvg: null,
  trinityHistAvg: null,
})

export const ContractContextProvider = (props) => {

  const [Contract, setContract] = useState(null) // capital Contract refers to the compiled contract (not the abi)
  const [contractAddress, setContractAddress] = useState(null)
  const [orovilleHeight, setOrovilleHeight] = useState(null)
  const [trinityHeight, setTrinityHeight] = useState(null)

  useEffect(() => {
    const setContractData = async () => {
      try {
        const contract = await axios.get(`${url}ReservoirLevels.json`).then(res => res.data)  // axios.get returns an http response obj, res.data = HackathonFactory contract
        const address = await axios.get(`${url}ReservoirLevelsAddress.json`).then(res => res.data.address)
        setContract(contract)
        setContractAddress(address)

        const orovilleHt = await getOrovilleLakeHeight(address, contract.abi)
        const trinityHt = await getTrinityLakeHeight(address, contract.abi)
        setOrovilleHeight(orovilleHt)
        setTrinityHeight(trinityHt)

        console.log('set contract data')
      } catch (e) {
        console.log('err', e)
      }
    }

    setContractData()
  }, [])

  // get oroville lake height
  const getOrovilleLakeHeight = async (addr, abi) => {
    console.log("getOrovilleLakeHeight called from contractContext")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(addr, abi, provider)
    try {
      const orovilleHt = await contract.orovilleLakeHeight()
      console.log('got oroville lake height', orovilleHt.div(decimals).toNumber())
      return orovilleHt.div(decimals).toNumber()
    } catch (e) {
      console.log('error getting account', e)
      return 'error'
    }
  }

  // get trinity lake height
  const getTrinityLakeHeight = async (addr, abi) => {
    console.log("getTrinityLakeHeight called from contractContext")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(addr, abi, provider)
    try {
      const trinityHt = await contract.trinityLakeHeight()
      console.log('got oroville lake height', trinityHt.div(decimals).toNumber())
      return trinityHt.div(decimals).toNumber()
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
      orovilleHeight,
      trinityHeight,
      orovilleHistAvg: 100,
      trinityHistAvg: 100
    }} >
      {props.children}
    </ContractContext.Provider>
  )

}

export default ContractContext
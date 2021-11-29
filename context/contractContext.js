import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ethers } from 'ethers'

const url = 'http://localhost:3000/'
// const url = 'https://{INSERT_PROJECT}.vercel.app/'
// const decimals = ethers.BigNumber.from(10).pow(18)

const ContractContext = React.createContext({
  Contract: null,
  contractAddress: null,
  donPedroHeight: null,
  modestoHeight: null,
  donPedroHistAvgHt: null,
  modestoHistAvgHt: null,
  getCounter: async () => { },
})

export const ContractContextProvider = (props) => {

  const [Contract, setContract] = useState(null) // capital Contract refers to the compiled contract (not the abi)
  const [contractAddress, setContractAddress] = useState(null)
  const [donPedroHeight, setDonPedroHeight] = useState(null)
  const [modestoHeight, setModestoHeight] = useState(null)
  const [donPedroHistAvgHt, setDonPedroHistAvgHt] = useState(null)
  const [modestoHistAvgHt, setModestoHistAvgHt] = useState(null)

  useEffect(() => {
    const setContractData = async () => {
      try {
        const contract = await axios.get(`${url}ReservoirLevels.json`).then(res => res.data)  // axios.get returns an http response obj, res.data = HackathonFactory contract
        const address = await axios.get(`${url}ReservoirLevelsAddress.json`).then(res => res.data.address)
        setContract(contract)
        setContractAddress(address)

        const donPedroHt = await getDonPedroLakeHeight(address, contract.abi)
        const modestoHt = await getModestoLakeHeight(address, contract.abi)
        const donPedroHistAvgHt = await getDonPedroHistAvgHt(address, contract.abi)
        const modestoHistAvgHt = await getModestoHistAvgHt(address, contract.abi)
        setDonPedroHeight(donPedroHt)
        setModestoHeight(modestoHt)
        setDonPedroHistAvgHt(donPedroHistAvgHt)
        setModestoHistAvgHt(modestoHistAvgHt)

        console.log('set contract data')
      } catch (e) {
        console.log('err', e)
      }
    }

    setContractData()
  }, [])

  // get Don Pedro lake height
  const getDonPedroLakeHeight = async (addr, abi) => {
    console.log("getDonPedroLakeHeight called from contractContext")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(addr, abi, provider)
    try {
      const donPedroHt = await contract.donPedroLakeHeight()
      console.log('got don pedro lake height', donPedroHt.toNumber())
      return donPedroHt.toNumber()
    } catch (e) {
      console.log('error getting height', e)
      return 'error'
    }
  }

  // get modesto lake height
  const getModestoLakeHeight = async (addr, abi) => {
    console.log("getModestoLakeHeight called from contractContext")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(addr, abi, provider)
    try {
      const modestoHt = await contract.modestoLakeHeight()
      console.log('got don pedro lake height', modestoHt.toNumber())
      return modestoHt.toNumber()
    } catch (e) {
      console.log('error getting height', e)
      return 'error'
    }
  }

  // get don pedro historicalAvgHeight

  const getDonPedroHistAvgHt = async (addr, abi) => {
    console.log("getDonPedroHistAvgHt called from contractContext")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(addr, abi, provider)
    try {
      const donPedroAvgHistoricalHt = await contract.donPedroHistoricalAvgHeight()
      console.log('got don pedro lake historical avg height', donPedroAvgHistoricalHt.toNumber())
      return donPedroAvgHistoricalHt.toNumber()
    } catch (e) {
      console.log('error getting height', e)
      return 'error'
    }
  }

  // get modesto historicalAvgHeight

  const getModestoHistAvgHt = async (addr, abi) => {
    console.log("getModestoHistAvgHt called from contractContext")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(addr, abi, provider)
    try {
      const modestoAvgHistoricalHt = await contract.modestoHistoricalAvgHeight()
      console.log('got modesto historical avg height', modestoAvgHistoricalHt.toNumber())
      return modestoAvgHistoricalHt.toNumber()
    } catch (e) {
      console.log('error getting height', e)
      return 'error'
    }
  }

  // get time left in contract

  // each counter = 25 seconds
  // days represented by 25 sec (1 counter)
  // months represented by 75 sec (3 counter)
  // years represented by counter&6==1 (1 day after the year ends)

  const getCounter = async () => {
    console.log("getCounter called from contractContext")
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const contract = new ethers.Contract(contractAddress, Contract.abi, provider)
    try {
      const counter = await contract.counter()
      console.log('got counter', counter.toNumber())
      return counter.toNumber()
    } catch (e) {
      console.log('error getting counter', e)
      return 'error'
    }
  }



  return (
    <ContractContext.Provider value={{
      Contract,
      contractAddress,
      donPedroHeight,
      modestoHeight,
      donPedroHistAvgHt,
      modestoHistAvgHt,
      getCounter,
    }} >
      {props.children}
    </ContractContext.Provider>
  )

}

export default ContractContext
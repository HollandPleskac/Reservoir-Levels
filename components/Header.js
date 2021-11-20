import React, { useContext } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdjust } from '@fortawesome/free-solid-svg-icons'
import MetaMaskBtn from './MetaMaskBtn'
import ConnectionContext from '../context/connectionContext'

const Header = () => {
  const connectionCtx = useContext(ConnectionContext)
  return (
    <div className='w-full flex items-center shadow-md' >
      <Logo />
      <div className='flex-grow flex justify-center items-center py-4' >
        <HeaderLink name="About" href="#" />
        <HeaderLink name="Information" href="#" />
        <HeaderLink name="FAQ" href="#" />
      </div>
      <div className='w-1/4 pr-10 flex justify-end' >
        <MetaMaskBtn connection={connectionCtx.connection} />
      </div>
    </div>
  )
}

const Logo = () => {
  return (
    <Link passHref href="/" >
      <a className='w-1/4 pl-10 flex items-center cursor-pointer' >
        <FontAwesomeIcon icon={faAdjust} className="text-3xl mr-4" />
        <h1 className='text-lg' >Reservoir Levels</h1>
      </a>
    </Link>
  )
}


const HeaderLink = (props) => {
  return (
    <Link href={props.href}  >
      <a className="p-4 hover:bg-gray-50 transition ease-in duration-100">{props.name}</a>
    </Link>
  )
}


export default Header

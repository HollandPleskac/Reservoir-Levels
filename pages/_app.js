import '../styles/globals.css'
import { ConnectionContextProvider } from '../context/connectionContext'
import { ContractContextProvider } from '../context/contractContext'

function MyApp({ Component, pageProps }) {
  return (
    <ConnectionContextProvider>
      <ContractContextProvider>
        <Component {...pageProps} />
      </ContractContextProvider>
    </ConnectionContextProvider>
  )
}

export default MyApp

import '../styles/globals.css'
import { ConnectionContextProvider } from '../context/connectionContext'

function MyApp({ Component, pageProps }) {
  return (
    <ConnectionContextProvider>
      <Component {...pageProps} />
    </ConnectionContextProvider>
  )
}

export default MyApp

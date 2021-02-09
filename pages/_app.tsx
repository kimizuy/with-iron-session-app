import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import fetch from '../lib/fetchJson'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: fetch,
        onError: (err) => {
          console.error(err)
        }
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp

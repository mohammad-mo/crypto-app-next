import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { useTheme } from 'next-themes'

// Components
import Loading from '../../components/loading'

export async function getServerSideProps(staticProps) {
  const params = staticProps.params
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false`,
  )
  const data = await res.json()
  const findCoinByName = data.find((coin) => {
    return coin.name === params.name
  })
  return {
    props: {
      coinName: findCoinByName ? findCoinByName : {},
    },
  }
}

const SingleCoin = ({ coinName }) => {
  const { resolvedTheme, setTheme } = useTheme()

  if (!coinName) return <Loading />

  return (
    <div className='py-5 px-2 sm:px-10 min-h-screen'>
      <Head>
        <title>{coinName.name}</title>
      </Head>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-between items-center space-x-3'>
          <Link href='/coins'>
            <a passhref='true' className='btn btn-outline'>
              Back to Home
            </a>
          </Link>
          <select
            value={resolvedTheme}
            onChange={(e) => setTheme(e.target.value)}
            className='select select-bordered select-accent max-w-xs'
          >
            <option value='system'>System</option>
            <option value='dark'>Dark</option>
            <option value='light'>Light</option>
          </select>
        </div>
        <div className='avatar flex flex-col items-center my-10'>
          <div className='w-36 mask mask-squircle'>
            <Image
              src={coinName.image}
              alt={coinName.name}
              width={'144px'}
              height={'144px'}
              layout={'responsive'}
            />
          </div>
          <h2 className='text-2xl sm:text-4xl mt-5 font-semibold text-center'>
            {coinName.name}
          </h2>
        </div>
        <div className='card border-accent border-2 p-5 max-w-3xl mx-auto overflow-x-auto'>
          <table className='table'>
            <tbody>
              <tr>
                <td>Market Cap Rank</td>
                <td>#{coinName.market_cap_rank}</td>
              </tr>
              <tr>
                <td>Price</td>
                <td>${coinName.current_price.toLocaleString()}</td>
              </tr>
              <tr>
                {coinName.roi && (
                  <>
                    <td>{coinName.name} ROI</td>
                    <td
                      className={
                        coinName.roi?.percentage > 0
                          ? 'text-green-600'
                          : 'text-red-600'
                      }
                    >
                      {coinName.roi?.percentage.toFixed(2)}%
                    </td>
                  </>
                )}
              </tr>
              <tr>
                <td>Market Cap</td>
                <td>${coinName.market_cap.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Trading Volume</td>
                <td>${coinName.total_volume.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Volume / Market Cap</td>
                <td>
                  {(coinName.total_volume / coinName.market_cap).toFixed(4)}
                </td>
              </tr>
              <tr>
                <td>24h Low / 24h High</td>
                <td>
                  ${coinName.low_24h.toLocaleString()} / $
                  {coinName.high_24h.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td>All-Time High</td>
                <td>
                  <div>
                    <p>${coinName.ath.toFixed(2)}</p>
                    <p className='text-red-600'>
                      {coinName.ath_change_percentage.toFixed(1)}%
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>All-Time High Date</td>
                <td>
                  {new Date(coinName.ath_date).toISOString().slice(0, 10)}
                </td>
              </tr>
              <tr>
                <td>All-Time Low</td>
                <td>
                  <div>
                    <p>${coinName.atl}</p>
                    <p className='text-green-600'>
                      {coinName.atl_change_percentage.toFixed(1)}%
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td>All-Time Low Date</td>
                <td>
                  {new Date(coinName.atl_date).toISOString().slice(0, 10)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default SingleCoin

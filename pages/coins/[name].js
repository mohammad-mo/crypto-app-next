import { useTheme } from 'next-themes'

import Link from 'next/link'
import Image from 'next/image'

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
  const { theme, setTheme } = useTheme('dark')

  if (!coinName) return <Loading />

  return (
    <div className='py-5 px-2 sm:px-10 min-h-screen'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex justify-between items-center space-x-3'>
          <Link href='/'>
            <a passhref='true' className='btn btn-outline'>
              Back to Home
            </a>
          </Link>
          <label className='swap swap-rotate'>
            <input
              type='checkbox'
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <svg
              className='swap-on fill-current w-8 h-8'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
            </svg>
            <svg
              className='swap-off fill-current w-8 h-8'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
            >
              <path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
            </svg>
          </label>
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

import Head from 'next/head'

import { useState } from 'react'
import { useTheme } from 'next-themes'

// Components
import Loading from '../../components/loading'
import Pagination from '../../components/pagination'
import Coin from '../../components/coin'

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
  )
  const data = await res.json()

  return { props: { data } }
}

const Coins = ({ data }) => {
  const { resolvedTheme, setTheme } = useTheme()

  const [seacrh, setSeacrh] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [coinsPrePage] = useState(20)

  const filteredCoins = data.filter((coin) =>
    coin.name.toLocaleLowerCase().includes(seacrh.toLocaleLowerCase()),
  )

  const changeHandler = (e) => {
    setSeacrh(e.target.value)
  }

  // Pagination
  const indexOfLastCoin = currentPage * coinsPrePage
  const indexOfFirstCoin = indexOfLastCoin - coinsPrePage
  const currentCoins = filteredCoins.slice(indexOfFirstCoin, indexOfLastCoin)

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  if (!data) return <Loading />

  return (
    <>
      <Head>
        <title>Crypto App</title>
      </Head>
      <div className='py-5 px-2 sm:px-10 min-h-screen'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex justify-between items-center mb-10 space-x-3'>
            <input
              className='input input-bordered input-accent w-full max-w-xs'
              type='search'
              placeholder='Find your coin...'
              value={seacrh}
              onChange={changeHandler}
            />
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
          <div className='card overflow-x-auto'>
            <table className='table table-zebra'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Symbol</th>
                  <th>Price</th>
                  <th>Market Cap</th>
                  <th>Price Change</th>
                </tr>
              </thead>
              <tbody>
                {currentCoins.map((coin) => (
                  <Coin
                    key={coin.id}
                    id={coin.id}
                    rank={coin.market_cap_rank}
                    name={coin.name}
                    image={coin.image}
                    symbol={coin.symbol}
                    price={coin.current_price}
                    marketCap={coin.market_cap}
                    priceChange={coin.price_change_percentage_24h}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            coinsPrePage={coinsPrePage}
            totalCoins={filteredCoins.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  )
}

export default Coins

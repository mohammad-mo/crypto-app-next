const Pagination = ({ coinsPrePage, totalCoins, currentPage, paginate }) => {
  const pageNumbers = []

  for (let i = 1; i < Math.ceil(totalCoins / coinsPrePage + 1); i++)
    pageNumbers.push(i)

  return (
    <div className='btn-group flex justify-center mt-5'>
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={currentPage === number ? 'btn btn-active' : 'btn'}
          onClick={() => paginate(number)}
        >
          {number}
        </button>
      ))}
    </div>
  )
}

export default Pagination

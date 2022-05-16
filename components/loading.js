const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center h-[100vh]'>
      <progress className='progress w-56 bg-slate-300'></progress>
      <p className='text-2xl mt-3'>Loading</p>
    </div>
  )
}

export default Loading

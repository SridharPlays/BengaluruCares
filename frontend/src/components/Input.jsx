const Input = ({icon:Icon,...props}) => {
  return (
    <div className='relative mb-6'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <Icon className='size-5 text-[#2B3040]' />
        </div>
        <input 
            {...props}
            className='bg-[#222630]/20 backdrop-blur-sm px-4 py-2.5 outline-none w-full text-white rounded-lg border-2 border-solid border-[#2B3040] transition-all duration-150 hover:ring-2 hover:ring-blue-500 focus:ring-2 focus:ring-[#596A95] shadow-none focus:shadow-[0_0_10px_2px_rgba(89,106,149,0.7)]'
        ></input>
    </div>
  )
}

export default Input
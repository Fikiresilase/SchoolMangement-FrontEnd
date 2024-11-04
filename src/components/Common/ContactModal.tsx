interface Props {
    visible: boolean
    handleClick:()=>void
}

const ContactModal = ({ visible,handleClick }:Props) => {
    
    return (
        <div className={`${visible ? 'absolute w-[300px] min-h-[200px] bg-slate-100 z-10  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-60%]  rounded-lg shadow-md' : 'hidden'}`}>
            <h3 className='text-center p-3 after:w-[90%] after:h-[1px] after:relative after:bottom-0 after:mx-auto  after:block after:contain-" " after:bg-slate-500'>Contact Parent</h3>
            <textarea rows={4} placeholder='write your essage here' className='text-start relative w-[90%]  border left-[50%] translate-x-[-50%] bg-slate-200 shadow-lg ' />
            <div className='flex justify-center gap-4 px-4'>
            <input type='submit' value='Cancel' onClick={handleClick} className='btn-primary relative w-[70px] top-full p-2 text-center text-white bg-[red] rounded-md ' />
            <input type='submit'  value='Send'  onClick={handleClick} className='relative w-[70px] top-full p-2 text-center text-white bg-slate-400 rounded-lg ' />
      </div>
    </div>
  )
}

export default ContactModal

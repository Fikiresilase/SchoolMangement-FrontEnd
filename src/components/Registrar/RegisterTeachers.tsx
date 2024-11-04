

const RegisterTeachers = () => {
  
  return (
    
    <div className="w-full p-4 flex flex-col gap-2">
      <form>
          <h2>Teacher Info</h2>
          <label htmlFor="student-name" />
          <div className="w-full flex gap-2">
            
              <input id="#teacher-name" className="border-[2px]  border-slate-300 p-2" type="text" placeholder="Teacher Name" />
              <label htmlFor="last-name"/>
              <input id="#last-name" className="border-[2px]  border-slate-300 p-2" type="text" placeholder="last Name" />
          </div>
          
      <input className="border-[2px]  border-slate-300 p-2" type="email" placeholder="example@gmail.com" />
      <div className="flex gap-2">
      </div>
     
       <br/>
       <input type='submit' value='Submit' className=' relative w-[70px]  p-2 text-center text-white bg-slate-400 rounded-md ' />

</form>


          
          
    </div>
  )
}

export default RegisterTeachers

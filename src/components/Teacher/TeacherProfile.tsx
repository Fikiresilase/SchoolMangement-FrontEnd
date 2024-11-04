

const TeacherProfile = () => {
  return (
      <div className="w-full min-h-screen px-4">
          <h1>My profile</h1>
          <div className="flex p-2 h-fit w-full border  border-slate-600 rounded-lg items-center self-start mt-4">
              <div className="w-[60px] h-[60px] bg-slate-600 rounded-full"></div>
              <div className="lex flex-col p-4 justify-center">
                  <div className="w-full">
                      <p className="font-bold text-lg">Some Teacher</p>
                      <p className="text-sm">Teacher at branch 2</p>
                  </div>
              </div>
          </div>
            
      <table className="table table-striped table-bordered mt-4">
              <thead>
                  
          <tr className="p-2 text-center">
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          
            <tr className="p-2 text-center">
             <td className="p-2 text-center">Egele</td>
             <td className="p-2 text-center" >
                <input type="email"   className="w-[95%] p-2 text-center border" />
              </td>
             <td className="p-2 text-center" >
                <input type="password" className="w-[95%] p-2 text-center border" />
                      </td>
             <td className="p-2 text-center" >
                <input type="submit" value='save changes' className="w-[95%] p-2 text-center border bg-slate-300" />
                </td>
            </tr>
      
        </tbody>
      </table>
          
        
          


    </div>
  )
}

export default TeacherProfile

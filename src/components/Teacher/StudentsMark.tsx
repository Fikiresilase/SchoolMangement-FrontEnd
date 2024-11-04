import { useContext, useState } from "react";
import useStudentGrade from "../../hooks/useStudentGrade";
import { Student } from "../../services/student-service";
import StudentTable from "./StudentTable";
import StudentFilter from "../../contexts/studentFilter/studentFilter";
const StudentsMark = () => {
  const [courseResut, setCourseResult] = useState<string>('')
  const { students,selected} = useContext(StudentFilter)
  
  const handleSubmit = (student: Student) => {
   
    if (courseResut && selected?.course) {
      useStudentGrade(student._id, selected.course,courseResut)

    }
  }
  return (
    <StudentTable header={['Name', 'Grade', 'Course', 'Result']} title='Students Mark'>
      <>
      {students.map((s) => (
              <tr key={s._id} className="p-2 text-center cursor-pointer" >
                <td className="p-2 text-center">{s.name}</td>
                <td className="p-2 text-center">{s.grade.name}</td>
                <td className="p-2 text-center">{selected?.course}</td>
                <td className="flex justify-center gap-2  p-2 text-center">
                  <form className='flex justify-center gap-2 w-full  p-2 text-center'
                    onSubmit={() =>  handleSubmit(s) 
                  } >
                    <input onChange={(e)=>setCourseResult(e.currentTarget.value)}  type="number" min={0} max={100}  className=" w-[65%] p-2 text-center border" />
                    <input type='submit' value='Submit' className=' relative w-[70px]  p-2 text-center text-white bg-slate-400 rounded-md ' />
                  </form>
                </td>
              </tr>
    
      ))
     
      } </>
      </StudentTable>      

  );
};

export default StudentsMark;

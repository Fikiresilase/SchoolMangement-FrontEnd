import { useEffect, useState } from "react"
import { Student } from "../services/student-service";
import StudentService from '../services/student-service'


const useStudents = (endpoint:string) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState("")
  useEffect(() => {
    const { requestStudent } = StudentService.getTeacherStudent(endpoint)
    requestStudent.then(s => {
      setStudents(s.data); 
      
    }).catch(err => setError(err));
    

    
  },[])

  return {students,setStudents,error}
}

export default useStudents
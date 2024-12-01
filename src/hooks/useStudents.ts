import { useEffect, useState } from "react"
import { Student } from "../services/student-service";
import StudentService from '../services/student-service'


const useStudents = (teacherId?:string) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [error, setError] = useState("")
  useEffect(() => {

    if (teacherId) {
      const { requestStudent } = StudentService.getTeacherStudent(teacherId)
      requestStudent.then(s => {
        setStudents(s.data);
      }).catch(err => setError(err));
    }
    else{
    const { request } = StudentService.getAll<Student[]>()
    request.then(s => {
      setStudents(s.data); 
    }).catch(err => setError(err));
    }
    

    
  }, [])


  return {students,setStudents,error}
}

export default useStudents
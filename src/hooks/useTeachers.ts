import { useEffect, useState } from "react";
import  TeacherService from "../services/teacher-service";


export interface Course {
  name:string,
}

export interface Grade {
  name: number
  section: string[]
  course:Course[]

}
export interface Teacher {
    id:number
    name:string
    grade:Grade
    course:string


  }
const useTeacher = (endpoint: string) => {
  const [teacher, setTeacher] = useState()
  const [teacherCourseData, setTeacherCourseData] = useState<Grade[]>([])
  const [teacherGradeData, setTeacherGradeData] = useState<Grade[]>([])
  const [error, setError] = useState("");

  useEffect(() => {
    const { requestTeacher } = TeacherService.getTeachers(endpoint) 
    requestTeacher.then(res => { setTeacherCourseData(res.data.grade); setTeacherGradeData(res.data.grade)})
      .catch(err => setError(err.message))
    
    
  },[])
  
return {teacher,setTeacher,teacherCourseData,setTeacherCourseData,teacherGradeData,setTeacherGradeData,error}
}
export default useTeacher;
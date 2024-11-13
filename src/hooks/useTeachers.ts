import { useEffect, useState } from "react";
import  TeacherService from "../services/teacher-service";
import { Teacher } from "../services/teacher-service";

export interface Course {
  name:string,
}

export interface Grade {
  name: number
  section: string[]
  course:Course[]

}

const useTeacher = (endpoint?: string) => {
  const [teacher, setTeacher] = useState<Teacher[]>([])
  const [teacherCourseData, setTeacherCourseData] = useState<Grade[]>([])
  const [teacherGradeData, setTeacherGradeData] = useState<Grade[]>([])
  const [error, setError] = useState("");

  useEffect(() => {
    if (endpoint) {
      const { requestTeacher } = TeacherService.getTeacher(endpoint as string)
      requestTeacher.then(res => { setTeacherCourseData(res.data.grade); setTeacherGradeData(res.data.grade) })
        .catch(err => setError(err.message))
    }
    else {
      const { request } = TeacherService.getAll<Teacher[]>()
      request.then(res => setTeacher(res.data) )
        .catch(err => setError(err.message))

    }
    
  },[])
  
return {teacher,setTeacher,teacherCourseData,setTeacherCourseData,teacherGradeData,setTeacherGradeData,error}
}
export default useTeacher;
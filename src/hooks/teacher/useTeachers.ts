import { useEffect, useState } from "react";
import  TeacherService from "../../services/teacher-service";
import { Teacher } from "../../services/teacher-service";

export interface Course {
  name:string,
}

export interface Grade {
  name: number
  section: string[]
  course:Course[]

}

const useTeacher = (id?: string) => {
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [teacher, setTeacher] = useState<Teacher>()
  const [teacherCourseData, setTeacherCourseData] = useState<Grade[]>([])
  const [teacherGradeData, setTeacherGradeData] = useState<Grade[]>([])
  const [error, setError] = useState("");
 

  useEffect(() => {
    if (id) {
      const { requestTeacher } = TeacherService.getTeacher(id as string)
      requestTeacher.then(res => {
        setTeacher(res.data)
        setTeacherCourseData(res.data.grade);
        setTeacherGradeData(res.data.grade)
      })
        .catch(err => setError(err.message))
    }
    else {
      const { request } = TeacherService.getAll<Teacher[]>()
      request.then(res => setTeachers(res.data) )
        .catch(err => setError(err.message))

    }
    
  },[])
 
return {teacher,teachers,setTeachers,teacherCourseData,setTeacherCourseData,teacherGradeData,setTeacherGradeData,error}
}
export default useTeacher;
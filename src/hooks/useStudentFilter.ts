import { useEffect, useState } from "react";
import StudentService from "../services/student-service";
import useStudents from "./useStudents";
import useTeacher from "./useTeachers";
interface Selected {
    grade: number|null,
    section: string | null,
    course:string | null
}
  
const useStudentFilter = () => {

    const [selected, setSelected] = useState<Selected>()
    const teacherId = '66fbe6ae5bbf2d8c74209c41';
    const {teacherGradeData,teacherCourseData}=useTeacher('teacher/' + teacherId)

    const { students, setStudents } = useStudents('student/teacher/' + teacherId)
    const grades =teacherGradeData.map(g=>g.name)
    const sections = teacherGradeData.map(g => g.section)
    const courses = teacherCourseData.map(g =>g.course.map(c=>c.name))
    const [error, setError] = useState("");
    
    useEffect(() => {
    
      
        if (selected?.grade || selected?.section || selected?.course) {
        
          const { requestStudent } = StudentService.getTeacherStudent('student/teacher/' + teacherId , selected.grade,selected.section,selected?.course)
          requestStudent.then(s => {
            setStudents(s.data);
          }).catch(err => setError(err))
    
        }
        // if (selected?.course) {
        //   setStudents(students.flatMap(student => student.course.filter(course => course.name === selected.course).map(() => student)));
        // }
        
       
          
    }, [selected])
    

    return {students,selected,setSelected,grades,sections,courses,error}



}
export default useStudentFilter
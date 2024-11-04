import StudentService from "../services/student-service"

const useStudentGrade = (studentId: string, courseName: string, grade: string) => {
   
    StudentService.updateCourseGrade('student/' + studentId + '/course/' + courseName, grade)
    
   
    
}
export default useStudentGrade
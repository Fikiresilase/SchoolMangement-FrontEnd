import apiClient from "./api-client"
import { Student } from "./student-service"
interface TeacherInfo {
    firstName: string
    lastName: string
    email:string
}

class Register {
    registerTeacher(teacher:TeacherInfo) {
        apiClient.post('/register/teacher',teacher) 
    }
    registerStudent(student:Student) {
        apiClient.post('/register/student',{student}) 
    }
}

export default new Register
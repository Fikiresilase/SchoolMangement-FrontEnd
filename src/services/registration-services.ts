import apiClient from "./api-client"
interface TeacherInfo {
    firstName: string
    lastName: string
    email:string
}
export interface StudentForm {
    name: string,
    grade:number,
    email: '',
    section: '',
    password: '',

}

class Register {
    registerTeacher(teacher:TeacherInfo) {
       return apiClient.post('/register/teacher',teacher) 
    }
    registerStudent(student:StudentForm) {
        return apiClient.post('/register/student',{student}) 
    }
}

export default new Register
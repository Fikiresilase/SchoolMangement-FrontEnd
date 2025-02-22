import apiClient from "./api-client";
import { HttpServices } from "./http-services";

export interface Grade {
    id: string
    name:number
}
import { Course } from "./teacher-service";
export interface Parent {
    _id: string;
    name: string;
    phone:string
}
export interface Student {
    _id:string
    name: string
    email: string
    password:string
    grade:Grade;
    section: string
    parent:string
    course: Course[]
  }
 
class StudentService extends HttpServices {
    constructor() {
        super('/student/')
    }

    getTeacherStudent (id:string,grade?:any,section?:any,course?:any) {
        const controller  = new AbortController()
        const requestStudent = apiClient.get<Student[]>(`/student/teacher/${id}`,{params:{grade,section,course}})
        
        return {requestStudent,cancel:()=>controller.abort()}
    }
    updateCourseGrade(endpoint: string, grade: any) {
        
        apiClient.put(endpoint,{grade})
       
    }
   

}

export default new StudentService ()
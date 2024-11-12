import apiClient from "./api-client";
import { HttpServices } from "./http-services";

export interface Grade {
    id: string
    name:string
}
export interface Course {
    name: string
    grade:number
}
export interface Parent {
    id: string;
    name: string;
    phone:string
}
export interface Student {
    _id?:string
    name: string
    email: string
    password:string
    grade:Grade;
    section: string
    course: Course[]
  }

class StudentService extends HttpServices {
    constructor() {
        super('/student')
    }

    getTeacherStudent (endpoint:string,grade?:any,section?:any,course?:any) {
        const controller  = new AbortController()
        const requestStudent = apiClient.get<Student[]>(endpoint,{params:{grade,section,course}})
        
        return {requestStudent,cancel:()=>controller.abort()}
    }
    updateCourseGrade(endpoint: string, grade: any) {
        
        apiClient.put(endpoint,{grade})
       
    }
   

}

export default new StudentService ()
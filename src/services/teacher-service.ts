import apiClient from "./api-client"
import { HttpServices } from "./http-services"

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
      grade:Grade[]
  
    }
class TeacherService  extends HttpServices {
    constructor() {
        super('/teacher')
    }
    getTeachers (endpoint:string) {
        const controller = new AbortController ()
        const requestTeacher = apiClient.get<Teacher>(endpoint)
        
        return {requestTeacher,cancel:()=>controller.abort()}
    }
}
export default new TeacherService ()
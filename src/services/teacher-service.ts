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
      _id:string
      name:string
      email:string
      grade:Grade[]
      
  
    }
class TeacherService  extends HttpServices {
    constructor() {
        super('/teacher/')
    }
    getTeacher (id:string) {
        const controller = new AbortController ()
        const requestTeacher = apiClient.get<Teacher>('/teacher',{params:id})
        
        return {requestTeacher,cancel:()=>controller.abort()}
    }
}
export default new TeacherService ()
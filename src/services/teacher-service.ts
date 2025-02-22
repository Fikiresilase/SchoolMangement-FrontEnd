import apiClient from "./api-client"
import { HttpServices } from "./http-services"

export interface Course {
    name: string,
    addedToAverage: boolean
}

export interface Grade {
    _id?:string
    name: number
    section: string[]
    course:Course[]
 
}
export interface Teacher {
      _id:string
      name:string
      email:string
      grade:Grade[]
      password:string
      
  
    }
class TeacherService  extends HttpServices {
    constructor() {
        super('/teacher/')
    }
    getTeacher (id:string) {
        const controller = new AbortController ()
        const requestTeacher = apiClient.get<Teacher>(`/teacher/${id}`)
        console.log(requestTeacher)
        
        return {requestTeacher,cancel:()=>controller.abort()}
    }
}
export default new TeacherService ()
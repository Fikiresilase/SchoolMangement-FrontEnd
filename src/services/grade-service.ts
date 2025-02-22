import {HttpServices} from './http-services'
import { Course } from './teacher-service'
export interface Grade {
    _id: string
    label: number
    section: string[]
    course: Course[]
   
}

class GradeService extends HttpServices {
    constructor() {
        super('/grade')
    
    }
    
}

export default new GradeService()
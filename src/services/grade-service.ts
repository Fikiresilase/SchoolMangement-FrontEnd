import {HttpServices} from './http-services'
export interface Grade {
    _id: string
    label: number
    section: string[]
    course: string[]
   
}

class GradeService extends HttpServices {
    constructor() {
        super('/grade')
    
    }
    
}

export default  GradeService
import {HttpServices} from './http-services'
export interface Grade {
    _id: string
    label: string
    section: string[]
    course:string[]
}

class GradeService extends HttpServices {
    constructor() {
        super('/grade')
    
    }
    
}

export default  GradeService
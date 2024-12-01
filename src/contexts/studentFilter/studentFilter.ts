import { createContext, Dispatch } from "react"
import { Student } from "../../services/student-service"

interface Selected {
    grade: number | null
    section: string | null
    course:string | null
  }


export interface StudentFilterContext {
    selected: Selected |undefined
    students:Student[] 
    grades: number[]
    sections: string[][]
    courses: string[][]
    setSelected: Dispatch<Selected |undefined>
    error:string;
    
}

const studentFilterContext = createContext({} as StudentFilterContext)

export default studentFilterContext


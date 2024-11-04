import { useEffect, useState } from "react";
import GradeService from "../services/grade-service";
import { Grade } from "../services/grade-service";

const useGrade = ()=> {
   const[grades,setGrades] =useState<Grade[]>();
  useEffect(() => {
    const gradeService= new GradeService()
    const { request } = gradeService.getAll<Grade>() 
    request.then((res)=>setGrades(res.data))
  }
    
    , [])
  
return grades
}
export default useGrade;
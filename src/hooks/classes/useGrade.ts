import { useEffect, useState } from "react";
import GradeService from "../../services/grade-service";
import gradeService, { Grade } from "../../services/grade-service";


const useGrade = ()=> {
   const[grades,setGrades] =useState<Grade[]>();
  useEffect(() => {
  
    const { request } = gradeService.getAll<Grade[]>() 
    request.then((res) => {
      setGrades(res.data ); console.log(res.data)
    })
  }
    
    , [])
  
return grades
}
export default useGrade;
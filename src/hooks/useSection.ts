import axios from "axios";
import { useEffect, useState } from "react";

interface Student {
    id:number;
    name:string;


  }
const useGrade = ()=> {
   const[grade,setGrade] =useState<Student[]>();
  useEffect(()=>{
    axios.get('http://localhost:3000/api/school/branch/grade/')
    .then(res=>setGrade(res.data))
    .catch(err=>console.log(err)) ;
    
  },[])
  
return {grade}
}
export default useGrade;
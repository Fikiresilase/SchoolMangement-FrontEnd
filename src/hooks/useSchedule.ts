import { useEffect, useState } from "react";
import ScheduleServices from "../services/schedule-services";
import { Schedule } from "../services/schedule-services";

const useSchedule = (teacherId?:string)=> {
   const[schedules,setSchedules] =useState<Schedule[]>();
    useEffect(() => {
        if (teacherId) {
    const scheduleServices= new ScheduleServices()
    const { request } = scheduleServices.getByTeacher(teacherId) 
    request.then((res) => setSchedules(res.data))
        
           
          
        }
        else {
            const scheduleServices= new ScheduleServices()
            const { request } = scheduleServices.getAll<Schedule[]>() 
            request.then((res) => setSchedules(res.data))
            

        }
  }
    
    , [])
  
return schedules
}
export default useSchedule;
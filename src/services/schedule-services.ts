import apiClient from "./api-client";
import { HttpServices } from "./http-services";
interface Day {

    day: string,
    teacher: string
    period: string
    room: string
    course: string
    section: string
    grade:number
    
}
export interface Schedule {
    day:Day[]
}
class ScheduleServices extends HttpServices {
    constructor() {
        super('/schedule')
    }
    getByTeacher(teacherId: string) {
        const request = apiClient.get('/schedule',{params:{teacherId}})
        return { request }
        
        
    }
}

export default   ScheduleServices
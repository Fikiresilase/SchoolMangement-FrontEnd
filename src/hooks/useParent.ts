import { useEffect, useState } from "react"
import { Parent } from "../services/student-service"
import ParentServices from "../services/parent-services"

const useParent = (id?:string) => {
    const [parents, setParents] = useState<Parent[]>()
    const [parent,setParent] = useState<Parent>()
    useEffect(() => {
        const {request} = ParentServices.getAll<Parent[]>()
        request.then(res => setParents(res.data))

        if (id) {
            const request = ParentServices.getParent(id)
            request.then(res=>setParent (res.data))   
        }
        
    },[])
    return {parents,parent}
}
export default useParent
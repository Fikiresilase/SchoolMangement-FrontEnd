import { useContext, useEffect } from "react"
import RouterContext from "../contexts/routerContext/routerContexts"
import SideBarNav from "../components/AppLayout.tsx/AppLayoutComponents/SideBarNav"
import { Outlet } from "react-router-dom"

const TeacherPage = () => {
    const arr = [
        <SideBarNav label="Dashboard" linkTo="/teacher-page" />,
        <SideBarNav label="Student Mark" linkTo="/teacher-page/students-mark" />,
        <SideBarNav label="Contact Parent" linkTo="/teacher-page/contact-parent" />,
        <SideBarNav label="Teacher Profile" linkTo="/teacher-page/teacher-profile" />
      
    ]
    const { setRoutes } = useContext(RouterContext)

    useEffect(()=>setRoutes(arr),[])

    return (
    
            <Outlet />
    
  )
}

export default TeacherPage

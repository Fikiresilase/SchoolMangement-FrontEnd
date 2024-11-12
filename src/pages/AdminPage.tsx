import { Outlet } from "react-router-dom"
import SideBarNav from "../components/AppLayout.tsx/AppLayoutComponents/SideBarNav"
import { useContext, useEffect } from "react"
import RouterContext from "../contexts/routerContext/routerContexts"

const AdminPage = () => {
  const arr = [
    <SideBarNav label="Admin DashBoard" linkTo="/registrar-page/register-students" />,
   
      
  ]
  const { setRoutes } = useContext(RouterContext)

  useEffect(()=>setRoutes(arr),[])
  return (
    <Outlet/>
  )
}

export default AdminPage

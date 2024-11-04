import { useContext, useEffect } from "react"
import SideBarNav from "../components/AppLayout.tsx/AppLayoutComponents/SideBarNav"
import RouterContext from "../contexts/routerContext/routerContexts"
import { Outlet } from "react-router-dom"

const Registrar = () => {
    const arr = [
      <SideBarNav label="Register Students" linkTo="/registrar-page/register-students" />,
      <SideBarNav label="Register Teachers" linkTo="/registrar-page/register-teachers" />,
      <SideBarNav label="Assign Teachers" linkTo="/registrar-page/assign-teachers" />,
        
    ]
    const { setRoutes } = useContext(RouterContext)

    useEffect(()=>setRoutes(arr),[])
    return (
      <Outlet/>
    
  )
}

export default Registrar

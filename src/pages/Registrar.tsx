import { useContext, useEffect } from "react";
import SideBarNav from "../components/AppLayout.tsx/AppLayoutComponents/SideBarNav";
import { HiHome, HiUserAdd, HiUserGroup, HiClipboardCheck } from "react-icons/hi"; 
import RouterContext from "../contexts/routerContext/routerContexts";
import { Outlet } from "react-router-dom";

const Registrar = () => {
  const arr = [
    <SideBarNav 
      label="Dashboard" 
      linkTo="/registrar-page" 
      icon={<HiHome className="w-6 h-6" />} 
    />,
    <SideBarNav 
      label="Register Students" 
      linkTo="/registrar-page/register-students" 
      icon={<HiUserAdd className="w-6 h-6" />} 
    />,
    <SideBarNav 
      label="Register Teachers" 
      linkTo="/registrar-page/register-teachers" 
      icon={<HiUserGroup className="w-6 h-6" />} 
    />,
    <SideBarNav 
      label="Assign Teachers" 
      linkTo="/registrar-page/assign-teachers" 
      icon={<HiClipboardCheck className="w-6 h-6" />} 
    />,
    <SideBarNav 
      label="Assign  Courses" 
      linkTo="/registrar-page/assign-courses" 
      icon={<HiClipboardCheck className="w-6 h-6" />} 
    />
  ];

  const { setRoutes } = useContext(RouterContext);

  useEffect(() => {
    setRoutes(arr);
  }, []);

  return <Outlet />;
};

export default Registrar;

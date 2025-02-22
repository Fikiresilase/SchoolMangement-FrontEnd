import { useContext, useEffect } from "react";
import { HiHome, HiClipboardList, HiPhone, HiUser } from "react-icons/hi"; 
import RouterContext from "../contexts/routerContext/routerContexts";
import SideBarNav from "../components/AppLayout.tsx/AppLayoutComponents/SideBarNav";
import { Outlet } from "react-router-dom";

const TeacherPage = () => {
  const arr = [
    <SideBarNav
      label="Dashboard"
      linkTo="/teacher-page"
      icon={<HiHome className="w-6 h-6" />} 
    />,
    <SideBarNav
      label="Student Mark"
      linkTo="/teacher-page/students-mark"
      icon={<HiClipboardList className="w-6 h-6" />} 
    />,
    <SideBarNav
      label="Contact Parent"
      linkTo="/teacher-page/contact-parent"
      icon={<HiPhone className="w-6 h-6" />}
    />,
    <SideBarNav
      label="Teacher Profile"
      linkTo="/teacher-page/teacher-profile"
      icon={<HiUser className="w-6 h-6" />} 
    />,
  ];

  const { setRoutes } = useContext(RouterContext);

  useEffect(() => {
    setRoutes(arr);
  }, []);

  return <Outlet />;
};

export default TeacherPage;

import { useContext, useEffect } from "react";
import RouterContext from "../contexts/routerContext/routerContexts";
import { Outlet } from "react-router-dom";
import { HiHome, HiClipboardList, HiPhone, HiUser } from 'react-icons/hi';
import SideBarNav from "../components/AppLayout.tsx/AppLayoutComponents/SideBarNav";


const TeacherPage = () => {
  
    const arr = [
        <SideBarNav label="Dashboard" linkTo="/teacher-page" icon={<HiHome />} />,
        <SideBarNav label="Student Mark" linkTo="/teacher-page/students-mark" icon={<HiClipboardList />} />,
        <SideBarNav label="Contact Parent" linkTo="/teacher-page/contact-parent" icon={<HiPhone />} />,
        <SideBarNav label="Teacher Profile" linkTo="/teacher-page/teacher-profile" icon={<HiUser />} />
    ];

    const { setRoutes } = useContext(RouterContext);

    useEffect(() => setRoutes(arr), []);

    return <Outlet />;
};

export default TeacherPage;

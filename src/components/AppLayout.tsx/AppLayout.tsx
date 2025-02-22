import { Outlet } from 'react-router-dom';
import SideBar from './AppLayoutComponents/SideBar';
import { useContext } from 'react';
import RouterContext from '../../contexts/routerContext/routerContexts';

const AppLayout = () => {
  const { routes } = useContext(RouterContext);

  return (
    <>
      <div className="flex w-full h-fit bg-gradient-to-r from-blue-50 to-indigo-100">
    
        <SideBar routes={routes} />
        <div className="w-full mx-auto min-h-[100vh]   ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AppLayout;

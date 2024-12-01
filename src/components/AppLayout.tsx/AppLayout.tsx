import { Outlet } from 'react-router-dom';
import SideBar from './AppLayoutComponents/SideBar';
import { useContext } from 'react';
import RouterContext from '../../contexts/routerContext/routerContexts';

const AppLayout = () => {
  const { routes } = useContext(RouterContext);

  return (
    <>
      <div className="flex w-full h-fit">
    
        <SideBar routes={routes} />
        <div className="w-full mx-auto min-h-[100vh]  ">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AppLayout;

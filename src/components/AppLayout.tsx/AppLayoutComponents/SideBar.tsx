import { ReactElement } from "react";

interface Props {
  routes: ReactElement[];
}

const SideBar = ({ routes }: Props) => {
  return (
    <div className="flex flex-col max-w-[20vw] min-w-[20vw] min-h-screen py-2 px-2 bg-slate-800 text-white shadow-lg">
      {routes.map((route, index) => (
        <div
          key={index}
          className="flex items-center gap-2 p-2 mb-1 rounded-md text-gray-300 hover:bg-slate-600 hover:text-white transition-colors duration-200 cursor-pointer"
        >
          {route}
        </div>
      ))}
    </div>
  );
};

export default SideBar;

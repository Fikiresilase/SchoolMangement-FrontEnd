import { ReactElement, useState } from 'react';

interface Props {
  routes: ReactElement[];
}

const SideBar = ({ routes }: Props) => {
  const [isOpen, setIsOpen] = useState(false);  

  return (
    <>
     
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 text-black fixed top-0 right-2 z-50 w-10 h-10"
      >
       
        <i className="bi bi-list text-3xl"></i>
      </button>

     
      <div
        className={`flex flex-col fixed top-0 left-0 z-50 w-full h-full bg-slate-800 text-white shadow-lg transition-all duration-300 ease-in-out
        ${isOpen ? 'transform translate-y-0' : 'transform -translate-y-full'} 
        md:relative md:w-[20vw] md:min-w-[20vw] md:h-auto md:translate-y-0`}
      >
       
        {routes.map((route, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2 mb-1 rounded-md text-gray-300 hover:bg-slate-600 hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {route}
          </div>
        ))}
        
        <button
          onClick={() => setIsOpen(false)}  
          className="md:hidden p-4 text-white absolute top-0 right-2"
        >
          <i className="bi bi-x text-3xl"></i> 
        </button>
      </div>
    </>
  );
};

export default SideBar;

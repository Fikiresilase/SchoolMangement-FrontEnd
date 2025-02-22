import { ReactElement, useState, useEffect } from "react";

interface Props {
  routes: ReactElement[];
}

const SideBar = ({ routes }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("sidebar");
      if (sidebar && !sidebar.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-4 text-gray-700 fixed top-0 right-2 z-50 w-10 h-10 hover:text-gray-900 transition-colors duration-200"
        aria-label="Toggle Sidebar"
      >
        <i className="bi bi-list text-3xl"></i>
      </button>

      <div
        id="sidebar"
        className={`fixed top-0 left-0 w-full h-full md:w-[20vw] md:min-w-[20vw] md:h-auto md:relative 
        backdrop-blur-md bg-white/30 shadow-lg border border-white/20 rounded-r-lg 
        transition-all duration-300 ease-in-out
        ${isOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0"}`}
      >

        <div className="text-left text-3xl  p-12 text-gray-800 ">
          <span className="relative inline-block">
            Mutentiz
          </span>
        </div>

        {routes.map((route, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-4 mb-1 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100/50 transition-colors duration-200 cursor-pointer"
          >
            {route}
          </div>
        ))}

        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden p-4 text-gray-700 absolute top-0 right-2 hover:text-gray-900 transition-colors duration-200"
          aria-label="Close Sidebar"
        >
          <i className="bi bi-x text-3xl"></i>
        </button>
      </div>
    </>
  );
};

export default SideBar;
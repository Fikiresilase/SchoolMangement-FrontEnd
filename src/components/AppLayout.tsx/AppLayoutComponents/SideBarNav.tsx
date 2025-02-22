import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  linkTo: string;
  label: string;
  icon: ReactNode; 
}

const SideBarNav = ({ linkTo, label, icon }: Props) => {
  return (
    <Link to={linkTo} className="flex items-center gap-2 justify-between w-full p-4 border-b font-semibold border-gray-400">
      <span className="ml-3 text-medium ">{label}</span>
      {icon}
    </Link>
  );
};

export default SideBarNav;

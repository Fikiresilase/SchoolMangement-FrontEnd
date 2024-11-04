import { Link } from "react-router-dom"
interface Props {
    linkTo:string;
    label:string
}

const SideBarNav = ({ linkTo, label }: Props) => {
 
  return (
    <div>
      <Link to={linkTo} > <div className="w-full  p-4 border-b-[1px] border-black">{label}</div></Link>
      
    </div>
  )
}

export default SideBarNav

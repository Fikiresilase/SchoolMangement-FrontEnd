import { ReactElement } from "react";
interface Props {
  routes: ReactElement[]
}
const SideBar = ({routes}:Props) => {

  return (
    <div className="flex flex-col max-w-[20vw] min-w-[20vw] min-h-screen py-4 bg-slate-700 text-white  ">
      {routes.map((r,index) => <div key={index}>{r}</div>)}
    </div>
  )
}

export default SideBar

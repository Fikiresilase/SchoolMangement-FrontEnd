import React,{ createContext, ReactElement ,Dispatch } from "react";


export interface RouterContexType{
    routes: ReactElement[]
    setRoutes: Dispatch<React.SetStateAction<ReactElement[]>>

}

const RouterContext = createContext({} as RouterContexType)

export default RouterContext
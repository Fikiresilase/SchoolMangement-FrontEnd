import axios from "axios";

export interface User {
  id: string;
  role: string;
}


export default axios.create({
     baseURL:'http://localhost:3000/api',
     
})
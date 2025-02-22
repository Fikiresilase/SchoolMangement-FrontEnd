import apiClient from '../../services/api-client'
export interface User {
    id:string,
    role:string
}

async function login(user: User) {
    const response=await apiClient.post('/login',user)
    return  response.data
}
export default login
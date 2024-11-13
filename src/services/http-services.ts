import apiClient from "./api-client"
interface Entity {
    id:string
}
class HttpServices {
    endpoint: string
    constructor(endpoint: string) {
        this.endpoint = endpoint

    }

    getAll<T>() {
        const controller = new AbortController()
        const request = apiClient.get<T>(this.endpoint, { signal: controller.signal })
        return { request, cancel: () => controller.abort() }
    }
    updateOne<T extends Entity>(entity:T) {
        const request = apiClient.put<T>(this.endpoint + '/' + entity.id,entity)
        return request
       
    }
    create<T extends Entity>(entity: T) {
        const request = apiClient.post<T>(this.endpoint,entity)
        return request
        
    }
    delete<T>(id:T) {
        const request = apiClient.delete<T>(this.endpoint + id)
        return request
    
    }
}
const create = (endpoint: string) => new HttpServices(endpoint)

export  {create,HttpServices}
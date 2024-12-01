import apiClient from "./api-client";
import { HttpServices } from "./http-services";
import { Parent } from "./student-service";

class ParentServices extends HttpServices {
    constructor() {
        super('/parent/')
    }
    async getParent(id: string) {
        const request = apiClient.get<Parent>(`/parent/${id}`)
        return request
        
    }
}

export default new ParentServices
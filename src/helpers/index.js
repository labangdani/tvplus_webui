import axios from 'axios'

const apiClient = axios.create({baseURL: "https://api.2play.cm/"})
export const Api = {
    get(route, config) {
        const user = JSON.parse(localStorage.getItem("user"))
        const token = user.token
        if (token) {
            if (!config)
                config = {}
            if (!config.headers)
                config.headers = {}
    
            config.headers.Authorization = `Bearer ${token}`
        }

        return apiClient.get(route, config)
        
    },
    
    getwithouttoken(route) {
        return apiClient.get(route)  
    },

    postwithouttoken(route, data) {
        return apiClient.post(route, data)
    },

    post(route, data, config) {
        const user = JSON.parse(localStorage.getItem("user"))
        const token = user.token
        if (token) {
            if (!config)
                config = {}
            if (!config.headers)
                config.headers = {}
    
            config.headers.Authorization = `Bearer ${token}`
        }
        return apiClient.post(route, data, config)
        
    },

    putwithouttoken(route, data) {
        return apiClient.put(route, data)
    },

    put(route, data, config) {
        const user = JSON.parse(localStorage.getItem("user"))
        const token = user.token
        if (token) {
            if (!config)
                config = {}
            if (!config.headers)
                config.headers = {}
    
            config.headers.Authorization = `Bearer ${token}`
        }
        return apiClient.put(route, data, config)
    }
}

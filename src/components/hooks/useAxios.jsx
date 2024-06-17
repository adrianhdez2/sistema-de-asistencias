import axios from "axios"

export const useAxios = () => {    
    const axiosClient = axios.create({
        baseURL: 'http://localhost:3001',
        withCredentials: true
    })

    return { axiosClient }
}
import axios from "axios";
import apiConfig from "../environment"


const axiosInstance = axios.create({
    baseURL: apiConfig.url
});

export const api = {
    get(endpoint, params) {
        return axiosInstance.get(endpoint, {params});
    },
    post(endpoint, body) {
        return axiosInstance.post(endpoint, body);
    },
    put(endpoint, body) {
        return axiosInstance.put(endpoint, body);
    },
    delete(endpoint) {
        return axiosInstance.delete(endpoint);
    }
}

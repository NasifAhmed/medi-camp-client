import axios from "axios";

export const useAxios = () => {
    const instance = axios.create({
        // baseURL: "https://b8a11-server-side-nasif-ahmed.vercel.app/api/v1",
        baseURL: "http://localhost:5000",
        timeout: 1000,
    });
    return instance;
};

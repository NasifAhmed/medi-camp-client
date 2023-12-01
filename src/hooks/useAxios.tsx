import axios from "axios";

export const useAxios = () => {
    const instance = axios.create({
        baseURL: "https://medi-camp-server-zeta.vercel.app",
        // baseURL: "http://localhost:5000",
        timeout: 1000,
    });
    return instance;
};

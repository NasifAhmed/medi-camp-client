import axios from "axios";

export const useAxiosSecure = () => {
    const secureInstance = axios.create({
        baseURL: "https://medi-camp-server-zeta.vercel.app",
        // baseURL: "http://localhost:5000",
        timeout: 1000,
        withCredentials: true,
    });
    return secureInstance;
};

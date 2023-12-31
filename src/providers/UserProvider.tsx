import { useAxios } from "@/hooks/useAxios";
import { ReactNode, createContext, useContext, useState } from "react";
// import { useAxios } from "../hooks/useAxios";

// Types
import { Doctor, Organizer, Participant } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthProvider";
export type userType = Organizer | Participant | Doctor | null;
type userContextValues = {
    userFromDB: userType;
    loading: boolean;
};

// Default values
const defaultUserState: userContextValues = {
    userFromDB: null,
    loading: true,
};

export const UserContext = createContext(defaultUserState);

const UserProvider = ({ children }: { children: ReactNode }) => {
    const authContext = useContext(AuthContext);
    const axios = useAxios();
    const [loading, setLoading] = useState(true);

    const userDBQuery = useQuery({
        queryKey: ["userFromDB", authContext.user?.email],
        queryFn: async () => {
            const response = await axios.get<userType[]>(
                `/user?email=${authContext.user?.email}`
            );
            setLoading(false);
            return response.data;
        },
        enabled: !authContext.loading,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return (
        userDBQuery.data && (
            <UserContext.Provider
                value={{
                    userFromDB: userDBQuery.data[0],
                    loading,
                }}
            >
                {children}
            </UserContext.Provider>
        )
    );
};

export default UserProvider;

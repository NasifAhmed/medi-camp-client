import { ReactNode, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "@/providers/UserProvider";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const authContext = useContext(AuthContext);
    const { user, loading } = authContext;
    const { userFromDB } = useContext(UserContext);
    const location = useLocation();
    console.log(location.pathname);

    if (authContext === null) {
        return <Navigate state={location.pathname} to="/signup"></Navigate>;
    }

    if (loading) {
        return (
            <div>
                <h1>LOADING..................</h1>
            </div>
        );
    }

    if (!user) {
        return <Navigate state={location.pathname} to="/login"></Navigate>;
    } else if (userFromDB && userFromDB.role === "organizer") {
        if (
            location.pathname === "/doctor-profile" ||
            location.pathname === "/participant-profile" ||
            location.pathname === "/registered-camps"
        ) {
            return <Navigate to="/unauthorized" />;
        }
    } else if (userFromDB && userFromDB?.role === "doctor") {
        if (
            location.pathname === "/organizer-profile" ||
            location.pathname === "/participant-profile" ||
            location.pathname === "/add-a-camp" ||
            location.pathname === "/registered-camps" ||
            location.pathname === "/manage-camps" ||
            location.pathname === "/manage-upcoming-camps"
        ) {
            return <Navigate to="/unauthorized" />;
        }
    } else if (userFromDB && userFromDB?.role === "participant") {
        if (
            location.pathname === "/organizer-profile" ||
            location.pathname === "/doctor-profile" ||
            location.pathname === "/add-a-camp" ||
            location.pathname === "/manage-camps" ||
            location.pathname === "/manage-upcoming-camps"
        ) {
            return <Navigate to="/unauthorized" />;
        }
    }
    return children;
};

export default PrivateRoute;

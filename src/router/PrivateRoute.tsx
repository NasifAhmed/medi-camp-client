import { ReactNode, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const authContext = useContext(AuthContext);
    const { user, loading } = authContext;
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
    }

    return children;
};

export default PrivateRoute;

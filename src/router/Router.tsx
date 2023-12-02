import App from "@/App";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import AvailableCamps from "@/pages/AvailableCamps";
import Contact from "@/pages/Contact";
import CampDetails from "@/pages/CampDetails";
import AddCamp from "@/pages/AddCamp";
import RegisteredCamps from "@/pages/RegisteredCamps";
import ManageCamps from "@/pages/ManageCamps";
import DashBoard from "@/pages/DashBoard";
import OrganizerProfile from "@/pages/OrganizerProfile";
import ParticipantProfile from "@/pages/ParticipantProfile";
import NotFound from "@/pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import DoctorProfile from "@/pages/DoctorProfile";
import Unauthorized from "@/pages/Unauthorized";
import AddUpcomingCamp from "@/pages/AddUpcomingCamp";
import UpcomingCampDetails from "@/pages/UpcomingCampDetails";
import ManageUpcomingCamps from "@/pages/ManageUpcomingCamps";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <SignUp />,
            },
            {
                path: "/available-camps",
                element: (
                    <PrivateRoute>
                        <AvailableCamps />{" "}
                    </PrivateRoute>
                ),
            },
            {
                path: "/camp-details/:id",
                element: <CampDetails />,
            },
            {
                path: "/upcoming-camp-details/:id",
                element: <UpcomingCampDetails />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/add-a-camp",
                element: (
                    <PrivateRoute>
                        <AddCamp />
                    </PrivateRoute>
                ),
            },
            {
                path: "/add-upcoming-camp",
                element: (
                    <PrivateRoute>
                        <AddUpcomingCamp />
                    </PrivateRoute>
                ),
            },
            {
                path: "/registered-camps",
                element: (
                    <PrivateRoute>
                        <RegisteredCamps />
                    </PrivateRoute>
                ),
            },
            {
                path: "/manage-camps",
                element: (
                    <PrivateRoute>
                        <ManageCamps />{" "}
                    </PrivateRoute>
                ),
            },
            {
                path: "/manage-upcoming-camps",
                element: (
                    <PrivateRoute>
                        <ManageUpcomingCamps />
                    </PrivateRoute>
                ),
            },
            {
                path: "/dashboard",
                element: (
                    <PrivateRoute>
                        <DashBoard />
                    </PrivateRoute>
                ),
            },
            {
                path: "/organizer-profile",
                element: (
                    <PrivateRoute>
                        <OrganizerProfile />
                    </PrivateRoute>
                ),
            },
            {
                path: "/participant-profile",
                element: (
                    <PrivateRoute>
                        <ParticipantProfile />
                    </PrivateRoute>
                ),
            },
            {
                path: "/doctor-profile",
                element: (
                    <PrivateRoute>
                        <DoctorProfile />
                    </PrivateRoute>
                ),
            },
        ],
    },

    {
        path: "/unauthorized",
        element: <Unauthorized />,
    },
]);

export default Router;

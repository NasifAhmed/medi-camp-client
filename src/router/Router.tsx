import App from "@/App";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import FormTest from "@/demo/FormTest";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import AvailableCamps from "@/pages/AvailableCamps";
import Contact from "@/pages/Contact";
import CampDetails from "@/pages/CampDetails";
import AddCamp from "@/pages/AddCamp";
import DateTimeTest from "@/components/ui/DateTimeTest";
import RegisteredCamps from "@/pages/RegisteredCamps";
import ManageCamps from "@/pages/ManageCamps";
import DashBoard from "@/pages/DashBoard";
import OrganizerProfile from "@/pages/OrganizerProfile";
import ParticipantProfile from "@/pages/ParticipantProfile";
import NotFound from "@/pages/NotFound";

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
                path: "/test-form",
                element: <FormTest />,
            },
            {
                path: "/test-date",
                element: <DateTimeTest />,
            },
            {
                path: "/available-camps",
                element: <AvailableCamps />,
            },
            {
                path: "/camp-details/:id",
                element: <CampDetails />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "/add-a-camp",
                element: <AddCamp />,
            },
            {
                path: "/registered-camps",
                element: <RegisteredCamps />,
            },
            {
                path: "/manage-camps",
                element: <ManageCamps />,
            },
            {
                path: "/dashboard",
                element: <DashBoard />,
            },
            {
                path: "/organizer-profile",
                element: <OrganizerProfile />,
            },
            {
                path: "/participant-profile",
                element: <ParticipantProfile />,
            },
        ],
    },
]);

export default Router;

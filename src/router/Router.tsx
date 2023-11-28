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

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
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
        ],
    },
]);

export default Router;

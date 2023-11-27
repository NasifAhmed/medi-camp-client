import App from "@/App";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import FormTest from "@/demo/FormTest";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";
import AvailableCamps from "@/pages/AvailableCamps";
import Contact from "@/pages/Contact";

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
                path: "/available-camps",
                element: <AvailableCamps />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ],
    },
]);

export default Router;

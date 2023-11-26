import App from "@/App";
import Login from "@/components/Login";
import Register from "@/components/Register";
import FormTest from "@/demo/FormTest";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router-dom";

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
                path: "/register",
                element: <Register />,
            },
            {
                path: "/test-form",
                element: <FormTest />,
            },
        ],
    },
]);

export default Router;

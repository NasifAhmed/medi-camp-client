import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import Router from "./router/Router";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Helmet, HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HelmetProvider>
            <ThemeProvider defaultTheme="light" storageKey="medicamp-ui-theme">
                <RouterProvider router={Router} />
            </ThemeProvider>
        </HelmetProvider>
    </React.StrictMode>
);

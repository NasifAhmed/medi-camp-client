import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import Router from "./router/Router";
import AuthProvider from "./providers/AuthProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <HelmetProvider>
                    <ThemeProvider
                        defaultTheme="light"
                        storageKey="medicamp-ui-theme"
                    >
                        <ReactQueryDevtools />
                        <RouterProvider router={Router} />
                    </ThemeProvider>
                </HelmetProvider>
            </AuthProvider>
        </QueryClientProvider>
    </React.StrictMode>
);

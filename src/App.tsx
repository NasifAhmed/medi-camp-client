import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Toaster } from "sonner";
import Footer from "./components/Footer";
import { AnimatePresence } from "framer-motion";

function App() {
    const [title, setTitle] = useState("Medi Camp");
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            </Helmet>
            <div className="max-w-screen-xl min-h-screen xl:mx-auto md:mx-10 mx-3 flex flex-col">
                <NavBar />
                <div className="flex-grow">
                    <AnimatePresence>
                        <Outlet context={setTitle} />
                    </AnimatePresence>
                </div>
                <Footer />
            </div>
            <Toaster richColors position="bottom-center" />
        </>
    );
}

export default App;

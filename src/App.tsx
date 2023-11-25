import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { useState } from "react";
import { Helmet } from "react-helmet";

function App() {
    const [title, setTitle] = useState("Medi Camp");
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{title}</title>
                {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            </Helmet>
            <NavBar />
            <Outlet context={setTitle} />
        </>
    );
}

export default App;

import { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "@/providers/AuthProvider";

function Home() {
    const { user } = useContext(AuthContext);
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Home | Medi Camp");
    }, [setTitle, user]);

    return <div> HOME</div>;
}

export default Home;

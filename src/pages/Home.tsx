import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Home | Medi Camp");
    }, [setTitle]);

    return <div> HOME</div>;
}

export default Home;

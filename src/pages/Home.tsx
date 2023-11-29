import { useContext, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { AuthContext } from "@/providers/AuthProvider";
import { UserContext } from "@/providers/UserProvider";
import { motion } from "framer-motion";
import AnimationWrapper from "@/components/AnimationWrapper";

function Home() {
    const { user } = useContext(AuthContext);
    const { userFromDB } = useContext(UserContext);
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Home | Medi Camp");
        // console.log(userFromDB);
    }, [setTitle, user]);

    return <AnimationWrapper> HOME</AnimationWrapper>;
}

export default Home;

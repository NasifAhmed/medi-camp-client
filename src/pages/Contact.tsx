import AnimationWrapper from "@/components/AnimationWrapper";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function Contact() {

    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Contact Us | Medi Camp");
    }, [setTitle]);
    return <AnimationWrapper>Contact</AnimationWrapper>;
}

export default Contact;

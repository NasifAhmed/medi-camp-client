import AnimationWrapper from "@/components/AnimationWrapper";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Unauthorized() {
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Participant Profile | Medi Camp");
    }, [setTitle]);

    const navigate = useNavigate();
    return (
        <AnimationWrapper>
            {" "}
            <div className="flex items-center justify-center h-screen bg-destructive">
                <Card className="w-[420px]">
                    <CardHeader className="text-center">
                        <CardTitle className="lg:text-7xl text-4xl">
                            Access Denied
                        </CardTitle>
                        <CardDescription>
                            You don't have permission to visit this page.
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-center">
                        <Button onClick={() => navigate(-1)}>Go Back</Button>
                    </CardFooter>
                </Card>
            </div>
        </AnimationWrapper>
    );
}

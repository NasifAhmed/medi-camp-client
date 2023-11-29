import AnimationWrapper from "@/components/AnimationWrapper";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <AnimationWrapper>
            {" "}
            <div className="flex items-center justify-center h-screen bg-destructive">
                <Card className="w-[420px]">
                    <CardHeader className="text-center">
                        <CardTitle className="lg:text-7xl text-4xl">
                            404
                        </CardTitle>
                        <CardDescription>
                            The page you’re looking for doesn’t exist.
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

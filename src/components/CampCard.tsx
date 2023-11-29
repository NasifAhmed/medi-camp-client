import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Camp } from "@/types/types";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DateTime } from "luxon";
import { UserContext } from "@/providers/UserProvider";

type prop = {
    campData: Camp;
};

function CampCard({ campData }: prop) {
    const navigate = useNavigate();
    const { userFromDB } = useContext(UserContext);

    useEffect(() => {
        console.log(campData._id);
    }, []);

    return (
        <Card className="max-w-4xl w-full">
            <CardHeader>
                <CardTitle className="text-2xl">{campData.name}</CardTitle>
                <CardDescription className="text-lg">
                    <h3>
                        <span className="font-bold text-foreground">
                            Date & Time :{" "}
                        </span>
                        {DateTime.fromISO(campData.date).toHTTP()}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Venue :{" "}
                        </span>
                        {campData.venue}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Target Audience :{" "}
                        </span>
                        {campData.target_audience}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Fees :{" "}
                        </span>
                        ${campData.fees}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Spcialized Service :{" "}
                        </span>
                        {campData.special_service}
                    </h3>
                    <h3>
                        <span className="font-bold text-foreground">
                            Healthcare Professional in Attendance :{" "}
                        </span>
                        {campData.doctors.length}
                    </h3>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className=" max-h-80 mb-6 overflow-hidden">
                    <img
                        className="w-full object-cover object-center"
                        src={campData.img}
                        alt=""
                    />
                </div>
                <p>{campData.desc}</p>
            </CardContent>
            <CardFooter className="justify-center">
                <Button
                    onClick={() => navigate(`/camp-details/${campData._id}`)}
                >
                    Details
                </Button>
            </CardFooter>
        </Card>
    );
}

export default CampCard;

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Camp } from "@/types/types";
import { DateTime } from "luxon";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnimationWrapper from "./AnimationWrapper";
import { Button } from "./ui/button";

type prop = {
    campData: Camp;
};

// type countData = {
//     count: string;
// };

function CampCard({ campData }: prop) {
    const navigate = useNavigate();

    useEffect(() => {
        console.log(campData._id);
    }, []);

    // const axios = useAxios();
    // const particpantCountQuery = useQuery({
    //     queryKey: ["available camps", "count", "participant", campData._id],
    //     queryFn: async (): Promise<countData | null> => {
    //         try {
    //             const response = await axios.get(
    //                 `/registered?registered_camp=${campData._id}&count=0`
    //             );
    //             console.log(`Getting camp data for`, campData._id);

    //             // const fees = response.data.reduce((accum, current) => {
    //             //     if (current.payment_status) {
    //             //         return accum + current;
    //             //     }
    //             // });
    //             // return fees;
    //             return response.data;
    //         } catch (error) {
    //             console.log(`Error getting registered data : ${error}`);
    //             return null;
    //         }
    //     },
    //     enabled: !!campData,
    // });

    return (
        <AnimationWrapper>
            <Card data-aos="fade-up" className="max-w-4xl w-full">
                <CardHeader>
                    <CardTitle className="text-2xl">{campData.name}</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-lg mb-4">
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
                                Participant Count :{" "}
                            </span>
                            {campData?.participants?.length}
                        </h3>
                        <h3>
                            <span className="font-bold text-foreground">
                                Healthcare Professional in Attendance :{" "}
                            </span>
                            {campData?.doctors?.length}
                        </h3>
                    </div>
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
                        onClick={() =>
                            navigate(`/camp-details/${campData._id}`)
                        }
                    >
                        Details
                    </Button>
                </CardFooter>
            </Card>
        </AnimationWrapper>
    );
}

export default CampCard;

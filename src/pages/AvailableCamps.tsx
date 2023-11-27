import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Camp } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useAxios } from "@/hooks/useAxios";

function AvailableCamps() {
    const axios = useAxios();

    const campResponse = useQuery({
        queryKey: ["camp"],
        queryFn: async (): Promise<Camp[] | null> => {
            try {
                const res = await axios.get("/camp");
                return res.data;
            } catch (error) {
                console.log(`Error while fetching camp data : ${error}`);
                return null;
            }
        },
    });
    return (
        <div>
            <div className="camps-display flex flex-col justify-center items-center gap-5 mx-10">
                {campResponse.data &&
                    campResponse.data.map((campData: Camp) => {
                        return (
                            <Card className="max-w-3xl">
                                <CardHeader>
                                    <CardTitle className="text-2xl">
                                        {campData.name}
                                    </CardTitle>
                                    <CardDescription className="text-lg">
                                        <h3>
                                            <span className="font-bold text-foreground">
                                                Date :{" "}
                                            </span>
                                            {campData.date}
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
                                                Spcialized Service :{" "}
                                            </span>
                                            NO DATA
                                        </h3>
                                        <h3>
                                            <span className="font-bold text-foreground">
                                                Healthcare Professional in
                                                Attendance :{" "}
                                            </span>
                                            {campData.doctors.length}
                                        </h3>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <img
                                        className="mb-6"
                                        src={campData.img}
                                        alt=""
                                    />
                                    <p>{campData.desc}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    <Button>Details</Button>
                                    <Button>Join Camp</Button>
                                </CardFooter>
                            </Card>
                        );
                    })}
            </div>
        </div>
    );
}

export default AvailableCamps;

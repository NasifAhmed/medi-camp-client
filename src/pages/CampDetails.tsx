import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";
import { Camp } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Doctor } from "@/types/types";
import { DateTime } from "luxon";
import { Separator } from "@/components/ui/separator";

function CampDetails() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Camp Details | Medi Camp");
    }, [setTitle]);

    const { id } = useParams();
    const axios = useAxios();

    const campQuery = useQuery({
        queryKey: ["camp", id],
        queryFn: async (): Promise<Camp[] | null> => {
            try {
                const response = await axios.get(`/camp?_id=${id}`);
                return response.data;
            } catch (error) {
                console.log(`Error getting camp data : ${error}`);
                return null;
            }
        },
    });

    return (
        <>
            {campQuery.isLoading ? (
                <div>LOADING</div>
            ) : (
                campQuery.data && (
                    <>
                        <div className="flex flex-col space-y-5 max-w-3xl mx-auto">
                            <h1 className="text-center text-4xl font-bold">
                                {campQuery.data[0].name}
                            </h1>
                            <img src={campQuery.data[0].img} alt="" />
                            <h2 className="text-lg">
                                <span className="font-bold">Date & Time: </span>
                                {DateTime.fromISO(
                                    campQuery.data[0].date
                                ).toHTTP()}
                            </h2>
                            <h2 className="text-lg">
                                <span className="font-bold">Venue : </span>
                                {campQuery.data[0].venue}
                            </h2>
                            <h2 className="text-lg">
                                <span className="font-bold">
                                    Target audience :{" "}
                                </span>
                                {campQuery.data[0].target_audience}
                            </h2>
                            <h2 className="text-lg">
                                <span className="font-bold">Fees : </span>$
                                {campQuery.data[0].fees}
                            </h2>
                            <h2 className="text-lg">
                                <span className="font-bold">
                                    Participants :{" "}
                                </span>
                                {campQuery.data[0].participants?.length}
                            </h2>
                            <h2 className="text-lg">
                                <span className="font-bold">Purpose : </span>
                                {campQuery.data[0].purpose}
                            </h2>
                            <h2 className="text-lg">
                                <span className="font-bold">Benefits : </span>
                                {campQuery.data[0].benefits}
                            </h2>
                            <Separator className="w-full" />
                            <p className="text-lg">{campQuery.data[0].desc}</p>
                            {campQuery.data[0].special_service && (
                                <h2 className="text-lg">
                                    <span className="font-bold">
                                        Specialized Services :{" "}
                                    </span>
                                    {campQuery.data[0].special_service}
                                </h2>
                            )}
                            {campQuery.data[0].doctors?.length && (
                                <>
                                    <h2 className="text-lg font-bold">
                                        Attended Healthcare Professionals :
                                    </h2>
                                    <ol className="list-decimal ml-10">
                                        {campQuery.data[0].doctors.map(
                                            (doctor: Doctor) => {
                                                return (
                                                    <li>
                                                        {doctor.name},{" "}
                                                        {doctor.certification}
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ol>
                                </>
                            )}
                        </div>
                        <Separator className="w-full mt-10" />
                        <div className="flex justify-around mt-10">
                            <Button variant={"default"}>Join Camp</Button>
                            <Button variant={"outline"}>Another One</Button>
                        </div>
                    </>
                )
            )}
        </>
    );
}

export default CampDetails;

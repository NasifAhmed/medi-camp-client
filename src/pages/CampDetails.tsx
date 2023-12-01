import AnimationWrapper from "@/components/AnimationWrapper";
import JoinCampModal from "@/components/JoinCampModal";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAxios } from "@/hooks/useAxios";
import { UserContext } from "@/providers/UserProvider";
import { Camp, RegisteredParticipant } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useContext, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";

function CampDetails() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Camp Details | Medi Camp");
    }, [setTitle]);

    const { id } = useParams();
    const axios = useAxios();

    const { userFromDB } = useContext(UserContext);

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
        enabled: !!id,
    });
    const registeredQuery = useQuery({
        queryKey: ["registeredParticipants", "count", id],
        queryFn: async (): Promise<RegisteredParticipant[] | null> => {
            try {
                const response = await axios.get(
                    `/registered?registered_camp=${id}`
                );
                return response.data;
            } catch (error) {
                console.log(`Error getting camp data : ${error}`);
                return null;
            }
        },
    });
    // const registeredQueryByEmail = useQuery({
    //     queryKey: ["registeredParticipants", "count", id],
    //     queryFn: async (): Promise<RegisteredParticipant[] | null> => {
    //         try {
    //             const response = await axios.get(
    //                 `/registered?email=${userFromDB?.email}`
    //             );
    //             return response.data;
    //         } catch (error) {
    //             console.log(`Error getting camp data : ${error}`);
    //             return null;
    //         }
    //     },
    // });

    return (
        <>
            <Spinner
                condition={campQuery.isLoading || registeredQuery.isLoading}
            />
            <AnimationWrapper>
                {campQuery.data && (
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
                                {registeredQuery.data &&
                                    registeredQuery.data.length}
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
                                            (doctor: any, index: number) => {
                                                return (
                                                    <li key={index}>
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
                            {userFromDB?.role === "participant" &&
                                registeredQuery.data &&
                                registeredQuery.data[0] && (
                                    <>
                                        <Button disabled>Already Joined</Button>
                                    </>
                                )}
                            {userFromDB?.role === "participant" &&
                                registeredQuery.data &&
                                !registeredQuery.data[0] && (
                                    <>
                                        <JoinCampModal
                                            campData={campQuery.data[0]}
                                        />
                                    </>
                                )}
                        </div>
                    </>
                )}
            </AnimationWrapper>
        </>
    );
}

export default CampDetails;

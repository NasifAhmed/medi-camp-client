import AnimationWrapper from "@/components/AnimationWrapper";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAxios } from "@/hooks/useAxios";
import { UserContext } from "@/providers/UserProvider";
import { UpcomingCamp } from "@/types/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useContext, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { toast } from "sonner";

function UpcomingCampDetails() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Upcoming Camp Details | Medi Camp");
    }, [setTitle]);

    const { id } = useParams();
    const axios = useAxios();

    const { userFromDB } = useContext(UserContext);

    const userDoctorMutation = useMutation({
        mutationFn: (payload: any) =>
            axios
                .post("/user", payload)
                .then((res) => console.log(`Post query response ${res}`)),
    });

    const campQuery = useQuery({
        queryKey: ["upcomingcamp", "details", id],
        queryFn: async (): Promise<UpcomingCamp[] | null> => {
            try {
                const response = await axios.get(
                    `/upcomingcamp?_id=${id}&populate=0`
                );
                return response.data;
            } catch (error) {
                console.log(`Error getting camp data : ${error}`);
                return null;
            }
        },
        enabled: !!id,
    });
    // const registeredQuery = useQuery({
    //     queryKey: ["registeredParticipants", "count", id],
    //     queryFn: async (): Promise<UpcomingCamp[] | null> => {
    //         try {
    //             const response = await axios.get(
    //                 `/registered?registered_camp=${id}`
    //             );
    //             return response.data;
    //         } catch (error) {
    //             console.log(`Error getting camp data : ${error}`);
    //             return null;
    //         }
    //     },
    // });
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

    const upcomingCampMutation = useMutation({
        mutationFn: (payload: any) =>
            axios
                .post("/upcomingcamp", payload)
                .then((res) => console.log(`Post query response ${res}`)),
    });

    const submitHandler = () => {
        const upcomingCamp: any = {
            ...campQuery.data?.[0],
        };
        if (userFromDB?.role === "doctor") {
            upcomingCamp.doctors_interested.push(userFromDB._id);
            const newDoctorData = {
                ...userFromDB,
            };
            newDoctorData.info.interested_camps.push(campQuery.data?.[0]._id);
            userDoctorMutation.mutate(newDoctorData);
        } else {
            upcomingCamp.participants_interested.push(userFromDB?._id);
        }

        toast.promise(
            upcomingCampMutation
                .mutateAsync(upcomingCamp)
                .then(() => {
                    console.log("Joined successfully");
                })
                .catch((error) => {
                    console.error(error);
                }),
            {
                loading: "Loading...",
                success: `Joined successfully !`,
                error: "Error : Could not join !",
            }
        );
    };

    return (
        <>
            <Spinner condition={campQuery.isLoading} />
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
                                    Participants Interested :{" "}
                                </span>
                                {
                                    campQuery.data[0].participants_interested
                                        .length
                                }
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
                            {campQuery.data[0].doctors_interested?.length && (
                                <>
                                    <h2 className="text-lg font-bold">
                                        Interested Healthcare Professionals
                                        Interested :
                                    </h2>
                                    <ol className="list-decimal ml-10">
                                        {campQuery.data[0].doctors_interested.map(
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
                            campQuery.data &&
                            campQuery.data[0].participants_interested.includes(
                                userFromDB._id
                            ) ? (
                                <>
                                    <Button disabled>
                                        {userFromDB?.role === "participant"
                                            ? "Already Joined"
                                            : "Already Added To Interest"}
                                    </Button>
                                </>
                            ) : (
                                !(userFromDB?.role === "organizer") && (
                                    <>
                                        <Button onClick={submitHandler}>
                                            Show Interest
                                        </Button>
                                    </>
                                )
                            )}
                        </div>
                    </>
                )}
            </AnimationWrapper>
        </>
    );
}

export default UpcomingCampDetails;

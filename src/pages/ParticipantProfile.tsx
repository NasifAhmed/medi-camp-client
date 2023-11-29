import CampCardSmall from "@/components/CampCardSmall";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAxios } from "@/hooks/useAxios";
import { UserContext } from "@/providers/UserProvider";
import { Camp, RegisteredParticipant } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useContext, useDebugValue } from "react";
import UpdateCampModal from "@/components/updateCampModal";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import { useNavigate } from "react-router-dom";
import AnimationWrapper from "@/components/AnimationWrapper";

function ParticipantProfile() {
    const axios = useAxios();
    const { userFromDB, loading } = useContext(UserContext);

    const queryResponse = useQuery({
        queryKey: ["camp"],
        queryFn: async (): Promise<RegisteredParticipant[] | null> => {
            try {
                const res = await axios.get(
                    `/registered?email=${userFromDB?.email}`
                );
                return res.data;
            } catch (error) {
                console.log(`Error while fetching camp data : ${error}`);
                return null;
            }
        },
        enabled: !!userFromDB?._id,
    });
    const navigate = useNavigate();

    return (
        <AnimationWrapper>
            {" "}
            <Card className="w-full h-full">
                <CardHeader>
                    <CardTitle className="text-center text-2xl">
                        Participant Profile
                    </CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent className="text-lg">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-0 justify-evenly items-center w-full">
                        {userFromDB?._id && (
                            <>
                                <div className="info">
                                    <h2>
                                        <span className="font-semibold">
                                            Name :{" "}
                                        </span>
                                        {userFromDB.name}
                                    </h2>
                                    <h2>
                                        <span className="font-semibold">
                                            Email :{" "}
                                        </span>
                                        {userFromDB.email}
                                    </h2>
                                    <h2>
                                        <span className="font-semibold">
                                            Phone Number :{" "}
                                        </span>
                                        {userFromDB.phone_number}
                                    </h2>
                                    <h2>
                                        <span className="font-semibold">
                                            Registered in :{" "}
                                        </span>
                                        {queryResponse.data &&
                                            queryResponse.data.length}{" "}
                                        camps
                                    </h2>
                                </div>
                                {/* <Button>Update Profile</Button> */}
                                <div className="flex flex-col gap-2">
                                    <UpdateProfileModal />
                                    <Button
                                        onClick={() => navigate("/dashboard")}
                                    >
                                        Go to dashboard
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    <Separator className="my-10" />
                    {queryResponse.data && (
                        <>
                            <CardTitle className="text-center text-xl mb-10">
                                Registered Camps
                            </CardTitle>
                            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3 ">
                                {queryResponse.data &&
                                    queryResponse.data.map((data) => {
                                        return (
                                            <>
                                                <CampCardSmall
                                                    campData={
                                                        data.registered_camp
                                                    }
                                                />
                                            </>
                                        );
                                    })}
                            </div>
                        </>
                    )}
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </AnimationWrapper>
    );
}

export default ParticipantProfile;

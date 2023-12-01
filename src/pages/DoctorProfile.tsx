import AnimationWrapper from "@/components/AnimationWrapper";
import CampCardSmall from "@/components/CampCardSmall";
import Spinner from "@/components/Spinner";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAxios } from "@/hooks/useAxios";
import { UserContext } from "@/providers/UserProvider";
import { Camp, User } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function DoctorProfile() {
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Doctor Profile | Medi Camp");
    }, [setTitle]);

    const axios = useAxios();
    const { userFromDB } = useContext(UserContext);

    const queryResponse = useQuery({
        queryKey: ["user", "doctor", "profile"],
        queryFn: async (): Promise<User[] | null> => {
            try {
                const res = await axios.get(`/user?email=${userFromDB?.email}`);
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
                        Doctor Profile
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
                                            Certification :{" "}
                                        </span>
                                        {userFromDB.info.certification}
                                    </h2>
                                    <h2>
                                        <span className="font-semibold">
                                            Speciality :{" "}
                                        </span>
                                        {userFromDB.info.speciality}
                                    </h2>
                                </div>
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

                    <CardTitle className="text-center text-xl mb-10">
                        Accepted Camps
                    </CardTitle>
                    {!queryResponse.data ? (
                        <Spinner condition={queryResponse.isLoading} />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3 lg:gap-0">
                                {queryResponse.data[0].info.accepted_camps &&
                                    queryResponse.data[0].info.accepted_camps.map(
                                        (data: Camp, index: number) => {
                                            return (
                                                <CampCardSmall
                                                    key={index}
                                                    campData={data}
                                                />
                                            );
                                        }
                                    )}
                            </div>
                        </>
                    )}
                </CardContent>
                <CardFooter></CardFooter>
            </Card>
        </AnimationWrapper>
    );
}

export default DoctorProfile;

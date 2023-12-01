import AnimationWrapper from "@/components/AnimationWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAxios } from "@/hooks/useAxios";
import { UserContext } from "@/providers/UserProvider";
import { RegisteredParticipant, User } from "@/types/types";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import AddCamp from "./AddCamp";
import FeedbackTable from "./FeedbackTable";
import ManageCamps from "./ManageCamps";
import ManageRegisteredCamps from "./ManageRegisteredCamps";
import RegisteredCamps from "./RegisteredCamps";

type countResult = {
    count: string;
};

function DashBoard() {
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Dashboard | Medi Camp");
    }, [setTitle]);

    const { userFromDB } = useContext(UserContext);
    const axios = useAxios();
    const navigate = useNavigate();

    const campCountQuery = useQuery({
        queryKey: ["camps", "count"],
        queryFn: async (): Promise<countResult | null> => {
            try {
                const response = await axios.get(`/camp?count=0`);
                return response.data;
            } catch (error) {
                console.log(`Error getting camp count data : ${error}`);
                return null;
            }
        },
    });

    const doctorCountQuery = useQuery({
        queryKey: ["user", "doctor", "count"],
        queryFn: async (): Promise<countResult | null> => {
            try {
                const response = await axios.get(`/user?role=doctor&count=0`);
                return response.data;
            } catch (error) {
                console.log(`Error getting doctor count data : ${error}`);
                return null;
            }
        },
        enabled: !!(userFromDB?.role === "organizer"),
    });

    const registeredQuery = useQuery({
        queryKey: ["dashboard", "registeredParticipants", "all"],
        queryFn: async (): Promise<RegisteredParticipant[] | null> => {
            try {
                const response = await axios.get(`/registered`);
                // const fees = response.data.reduce((accum, current) => {
                //     if (current.payment_status) {
                //         return accum + current;
                //     }
                // });
                // return fees;
                return response.data;
            } catch (error) {
                console.log(`Error getting registered data : ${error}`);
                return null;
            }
        },

        enabled: !!(userFromDB?.role === "organizer"),
    });

    const registeredParticipantQuery = useQuery({
        queryKey: ["dashboard", "registeredParticipants", "participant"],
        queryFn: async (): Promise<RegisteredParticipant[] | null> => {
            try {
                const response = await axios.get(
                    `/registered?email=${userFromDB?.email}`
                );
                // const fees = response.data.reduce((accum, current) => {
                //     if (current.payment_status) {
                //         return accum + current;
                //     }
                // });
                // return fees;
                return response.data;
            } catch (error) {
                console.log(`Error getting registered data : ${error}`);
                return null;
            }
        },
        enabled: !!(userFromDB?.role === "participant"),
    });
    const doctorUserQuery = useQuery({
        queryKey: ["dashboard", "doctor"],
        queryFn: async (): Promise<User[] | null> => {
            try {
                const response = await axios.get(
                    `/user?email=${userFromDB?.email}`
                );
                // const fees = response.data.reduce((accum, current) => {
                //     if (current.payment_status) {
                //         return accum + current;
                //     }
                // });
                // return fees;
                return response.data;
            } catch (error) {
                console.log(`Error getting docotor data : ${error}`);
                return null;
            }
        },
        enabled: !!(userFromDB && userFromDB?.role === "doctor"),
    });

    const feeCalculator = (data: RegisteredParticipant[]) => {
        let total = 0;

        data.forEach((data: any) => {
            if (data.payment_status) {
                total = total + parseInt(data.registered_camp.fees);
            }
        });
        return total;
    };

    return (
        <AnimationWrapper>
            {" "}
            <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="justify-center">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {userFromDB && userFromDB.role === "organizer" && (
                        <>
                            <TabsTrigger value="manage">
                                Manage Camps
                            </TabsTrigger>
                            <TabsTrigger value="manage_registered">
                                Manage Registered Camps
                            </TabsTrigger>
                            <TabsTrigger value="add-a-camp">
                                Add A Camp
                            </TabsTrigger>
                        </>
                    )}
                    {userFromDB && userFromDB.role === "participant" && (
                        <>
                            <TabsTrigger value="registered_camps">
                                Registered Camps
                            </TabsTrigger>
                            <TabsTrigger value="feedback">
                                Feedback and Ratings
                            </TabsTrigger>
                        </>
                    )}
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">
                                    Total Camps
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">
                                    {campCountQuery.data?.count}
                                </div>
                            </CardContent>
                        </Card>
                        {userFromDB && userFromDB.role === "organizer" && (
                            <>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Fees Collected
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {registeredQuery.isLoading ? (
                                                <span>Loading...</span>
                                            ) : (
                                                <span>
                                                    $
                                                    {registeredQuery.data &&
                                                        feeCalculator(
                                                            registeredQuery.data
                                                        )}
                                                </span>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Healthcare Professional Available
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {doctorCountQuery.data?.count}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total registration
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {registeredQuery.data?.length}
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}

                        {userFromDB && userFromDB.role === "participant" && (
                            <>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total camps registered
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {
                                                registeredParticipantQuery.data
                                                    ?.length
                                            }
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        )}
                        {userFromDB && userFromDB.role === "doctor" && (
                            <>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total camps accepted
                                        </CardTitle>
                                    </CardHeader>
                                    {doctorUserQuery.data && (
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {
                                                    doctorUserQuery.data[0]
                                                        ?.info.accepted_camps
                                                        ?.length
                                                }
                                            </div>
                                        </CardContent>
                                    )}
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total camps interested in
                                        </CardTitle>
                                    </CardHeader>
                                    {doctorUserQuery.data && (
                                        <CardContent>
                                            <div className="text-2xl font-bold">
                                                {
                                                    doctorUserQuery.data[0]
                                                        ?.info.interested_camps
                                                        ?.length
                                                }
                                            </div>
                                        </CardContent>
                                    )}
                                </Card>
                            </>
                        )}
                    </div>
                    <div className="">
                        <Card className="">
                            <CardHeader>
                                {userFromDB?.role === "organizer" && (
                                    <CardTitle>Organizer Dashboard</CardTitle>
                                )}
                                {userFromDB?.role === "participant" && (
                                    <CardTitle>Participant Dashboard</CardTitle>
                                )}
                                {userFromDB?.role === "doctor" && (
                                    <CardTitle>Doctor Dashboard</CardTitle>
                                )}
                            </CardHeader>
                            <CardContent className="text-center text-xl">
                                <h2>
                                    <span className="font-bold">Name : </span>
                                    {userFromDB?.name}
                                </h2>
                                <h2>
                                    <span className="font-bold">Email : </span>
                                    {userFromDB?.email}
                                </h2>
                                <Separator className="my-5" />
                                <Button
                                    onClick={() =>
                                        navigate(`/${userFromDB?.role}-profile`)
                                    }
                                >
                                    Go to profile
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="manage">
                    <ManageCamps />
                </TabsContent>
                <TabsContent value="manage_registered">
                    <ManageRegisteredCamps />
                </TabsContent>
                <TabsContent value="registered_camps">
                    <RegisteredCamps />
                </TabsContent>
                <TabsContent value="add-a-camp">
                    <AddCamp />
                </TabsContent>
                <TabsContent value="feedback">
                    <FeedbackTable />
                </TabsContent>
            </Tabs>
        </AnimationWrapper>
    );
}

export default DashBoard;

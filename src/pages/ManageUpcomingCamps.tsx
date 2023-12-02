import AnimationWrapper from "@/components/AnimationWrapper";
import ConfirmRegistrationModal from "@/components/ConfirmRegistrationModal";
import Spinner from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";
import { Camp, UpcomingCamp } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { toast } from "sonner";
import { DataTable } from "../components/DataTable";

function ManageUpcomingCamps() {
    const axios = useAxios();
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await axios
                .delete(`/upcomingcamp?_id=${id}`)
                .then((res) => {
                    console.log(`Camp delete response`, res);
                })
                .catch((e) => console.log(`Camp delete error : `, e));
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["all upcoming camps", "manage"],
            });
        },
    });

    const confirmMutation = useMutation({
        mutationFn: async (payload: any) => {
            await axios
                .post(`/camp`, payload)
                .then((res) => {
                    console.log(`Registered update response`, res);
                })
                .catch((e) => console.log(`Registered update error : `, e));
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["all upcoming camps", "manage"],
            });
        },
    });

    const queryResponse = useQuery({
        queryKey: ["all upcoming camps", "manage"],
        queryFn: async (): Promise<UpcomingCamp[] | null> => {
            try {
                const res = await axios.get("/upcomingcamp?populate=0");
                return res.data;
            } catch (error) {
                console.log(`Error while fetching camp data : ${error}`);
                return null;
            }
        },
    });

    const userDoctorMutation = useMutation({
        mutationFn: (payload: any) =>
            axios
                .post("/user", payload)
                .then((res) => console.log(`Post query response ${res}`)),
    });

    // const queryResponse = useQuery({
    //     queryKey: ["all upcoming camps", "manage"],
    //     queryFn: async (): Promise<UpcomingCamp[] | null> => {
    //         try {
    //             const res = await axios.get("/upcomingcamp?populate=0");
    //             return res.data;
    //         } catch (error) {
    //             console.log(`Error while fetching camp data : ${error}`);
    //             return null;
    //         }
    //     },
    // });

    const deleteHandler = (id: string) => {
        toast.promise(
            deleteMutation.mutateAsync(id).then(() => {}),
            {
                loading: "Deleting entry...",
                success: `Entry deleted !`,
                error: "Error : Could not delete !",
            }
        );
    };

    const confirmHandler = (data: any) => {
        const oldData = { ...data };
        delete oldData._id;
        const newCamp = {
            ...oldData,
            doctors: [...oldData.doctors_interested],
            participants: [...oldData.participants_interested],
        };

        toast.promise(
            deleteMutation.mutateAsync(data._id).then(() => {
                confirmMutation.mutateAsync(newCamp).then(() => {
                    axios.get(`/camp?&name=${newCamp.name}`).then((res) => {
                        newCamp.doctors.map((data: any) => {
                            const newDoctorData: any = {
                                ...data,
                            };
                            newDoctorData.info.interested_camps.push(
                                res.data._id
                            );
                            userDoctorMutation.mutate(newDoctorData);
                        });
                    });
                });
            }),
            {
                loading: "Updateing entry...",
                success: `Entry updated !`,
                error: "Error : Could not update !",
            }
        );
    };

    const columns: ColumnDef<Camp>[] = [
        {
            accessorKey: "name",
            header: "Camp Name",
        },
        {
            accessorKey: "date",
            header: "Date and Time",
            cell: (info: any) => {
                return DateTime.fromISO(info.getValue()).toLocaleString(
                    DateTime.DATETIME_MED
                );
            },
        },
        {
            accessorKey: "venue",
            header: "Venue",
        },
        {
            accessorKey: "fees",
            header: "Fees",
            cell: (info) => {
                return `$${info.getValue()}`;
            },
        },
        {
            accessorKey: "participants_interested",
            header: "Interested Participants",
            cell: (info: any) => {
                return `${info.getValue().length}`;
            },
        },
        {
            accessorKey: "doctors_interested",
            header: "Interested Healthcare Professionals",
            cell: (info: any) => {
                return `${info.getValue().length}`;
            },
        },
        {
            header: "Action",
            cell: (info: any) => {
                if (
                    // info.cell.row.original.doctors?.length <= 3 ||
                    // info.cell.row.original.participants?.length <= 10
                    false
                ) {
                    return <Button disabled>Publish</Button>;
                } else {
                    return (
                        <ConfirmRegistrationModal
                            confirmHandler={() =>
                                confirmHandler(info.row.original)
                            }
                        />
                    );
                }
            },
        },
        {
            header: "Action",
            cell: (info) => {
                if (info.getValue()) {
                    return (
                        <Button variant={"destructive"} disabled>
                            Cancel
                        </Button>
                    );
                } else {
                    return (
                        <Button
                            onClick={() =>
                                deleteHandler(`${info.row.original._id}`)
                            }
                            variant={"destructive"}
                        >
                            Cancel
                        </Button>
                    );
                }
            },
        },
    ];

    return (
        <AnimationWrapper>
            <>
                <Spinner condition={queryResponse.isLoading} />{" "}
                {queryResponse.data && !queryResponse.isLoading && (
                    <div className="container mx-auto py-10">
                        <DataTable
                            columns={columns}
                            data={queryResponse.data}
                        />
                    </div>
                )}
            </>
        </AnimationWrapper>
    );
}

export default ManageUpcomingCamps;

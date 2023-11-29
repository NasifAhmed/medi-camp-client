import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";
import { Camp, RegisteredParticipant } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { DataTable } from "../components/DataTable";
import { toast } from "sonner";
import { useState } from "react";
import UpdateCampModal from "@/components/updateCampModal";
import ConfirmRegistrationModal from "@/components/ConfirmRegistrationModal";
import AnimationWrapper from "@/components/AnimationWrapper";

function ManageRegisteredCamps() {
    const axios = useAxios();
    const queryClient = useQueryClient();
    const [participantCount, setParticipantCount] = useState();

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axios
                .delete(`/camp?_id=${id}`)
                .then((res) => {
                    console.log(`Camp delete response`, res);
                })
                .catch((e) => console.log(`Camp delete error : `, e));
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["all camps", "manage", "registered"],
            });
        },
    });

    const confirmMutation = useMutation({
        mutationFn: async (payload) => {
            await axios
                .post(`/registered?_id=${payload._id}`, payload)
                .then((res) => {
                    console.log(`Registered update response`, res);
                })
                .catch((e) => console.log(`Registered update error : `, e));
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["all camps", "manage", "registered"],
            });
        },
    });

    const queryResponse = useQuery({
        queryKey: ["all camps", "manage", "registered"],
        queryFn: async (): Promise<Camp[] | null> => {
            try {
                const res = await axios.get("/registered");
                return res.data;
            } catch (error) {
                console.log(`Error while fetching camp data : ${error}`);
                return null;
            }
        },
    });

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

    const confirmHandler = (oldData: RegisteredParticipant) => {
        const updatedRegistered: RegisteredParticipant = {
            ...oldData,
            // address: oldData.address,
            // age: oldData.age,
            // email: oldData.email,
            // emergency_phone_number: oldData.emergency_phone_number,
            // gender: oldData.gender,
            // name: oldData.name,
            // payment_status: oldData.payment_status,
            // registered_camp: oldData.registered_camp,
            // requirments: oldData.requirments,
            confirmation_status: true,
        };
        toast.promise(
            confirmMutation.mutateAsync(updatedRegistered).then(() => {}),
            {
                loading: "Updateing entry...",
                success: `Entry updated !`,
                error: "Error : Could not update !",
            }
        );
    };

    const columns: ColumnDef<Camp>[] = [
        {
            accessorKey: "registered_camp.name",
            header: "Camp Name",
        },
        {
            accessorKey: "registered_camp.date",
            header: "Date and Time",
            cell: (info) => {
                return DateTime.fromISO(info.getValue()).toLocaleString(
                    DateTime.DATETIME_MED
                );
            },
        },
        {
            accessorKey: "registered_camp.venue",
            header: "Venue",
        },
        {
            accessorKey: "name",
            header: "Registered by",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "registered_camp.fees",
            header: "Fees",
            cell: (info) => {
                return `$${info.getValue()}`;
            },
        },
        {
            accessorKey: "payment_status",
            header: "Payment Status",
            cell: (info) => {
                if (info.getValue()) {
                    return <span>Paid</span>;
                } else {
                    return <span>Unpaid</span>;
                }
            },
        },
        {
            accessorKey: "confirmation_status",
            header: "Payment Status",
            cell: (info) => {
                if (info.getValue()) {
                    return <Button disabled>Confirmed</Button>;
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
            {" "}
            {queryResponse.data && !queryResponse.isLoading && (
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={queryResponse.data} />
                </div>
            )}
        </AnimationWrapper>
    );
}

export default ManageRegisteredCamps;

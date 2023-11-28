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

function ManageRegisteredCamps() {
    const axios = useAxios();
    const queryClient = useQueryClient();
    const [participantCount, setParticipantCount] = useState();

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axios
                .delete(`/camp?_id=${id}`)
                .then((res) => {
                    console.log(`Camp delete response ${res}`);
                })
                .catch((e) => console.log(`Camp delete error : ${e}`));
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
            accessorKey: "payment_status",
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
        <>
            {queryResponse.data && !queryResponse.isLoading && (
                <div className="container mx-auto py-10">
                    <DataTable columns={columns} data={queryResponse.data} />
                </div>
            )}
        </>
    );
}

export default ManageRegisteredCamps;

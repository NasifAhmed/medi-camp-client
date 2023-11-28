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

function ManageCamps() {
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
                queryKey: ["all camps", "manage"],
            });
        },
    });

    const queryResponse = useQuery({
        queryKey: ["all camps", "manage"],
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
            accessorKey: "name",
            header: "Camp Name",
        },
        {
            accessorKey: "date",
            header: "Date and Time",
            cell: (info) => {
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
            accessorKey: "target_audience",
            header: "Target Audience",
        },
        {
            accessorKey: "special_service",
            header: "Spcialized Service Provided",
        },
        {
            accessorKey: "doctors",
            header: "Healthcare Professional in Attendence",
            cell: (info) => {
                return info.getValue().length;
            },
        },
        {
            accessorKey: "desc",
            header: "Description",
        },
        {
            accessorKey: "confirmation_status",
            header: "Confirmation Status",
            cell: (info) => {
                if (info.getValue()) {
                    return <span>Confirmed</span>;
                } else {
                    return <span>Pending</span>;
                }
            },
        },
        {
            accessorKey: "img",
            header: "Action",
            cell: (info) => {
                console.log(info.row.original);
                return <UpdateCampModal campData={info.row.original} />;
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

export default ManageCamps;

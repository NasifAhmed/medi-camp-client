import AnimationWrapper from "@/components/AnimationWrapper";
import UpdateCampModal from "@/components/UpdateCampModal";
import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";
import { Camp } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { toast } from "sonner";
import { DataTable } from "../components/DataTable";
import Spinner from "@/components/Spinner";

function ManageCamps() {
    const axios = useAxios();
    const queryClient = useQueryClient();

    const deleteRegisteredMutation = useMutation({
        mutationFn: async (id: string) => {
            await axios
                .delete(`/registered?registered_camp=${id}`)
                .then((res) => {
                    console.log(`Camp delete response ${res}`);
                })
                .catch((e) => console.log(`Camp delete error : ${e}`));
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["all camps", "manage"],
            });
            queryClient.invalidateQueries({
                queryKey: ["all camps", "manage", "registered"],
            });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            await axios
                .delete(`/camp?_id=${id}`)
                .then((res) => {
                    console.log(`Camp delete response ${res}`);
                    deleteRegisteredMutation.mutate(id);
                })
                .catch((e) => console.log(`Camp delete error : ${e}`));
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["all camps", "manage"],
            });
            queryClient.invalidateQueries({
                queryKey: ["all camps", "manage", "registered"],
            });
            queryClient.invalidateQueries({
                queryKey: ["camps", "count"],
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
            accessorKey: "target_audience",
            header: "Target Audience",
        },
        // {
        //     accessorKey: "special_service",
        //     header: "Spcialized Service Provided",
        // },
        {
            accessorKey: "doctors",
            header: "Healthcare Professional in Attendence",
            cell: (info: any) => {
                return info.getValue().length;
            },
        },
        // {
        //     accessorKey: "desc",
        //     header: "Description",
        // },
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
            id: "Update",
            header: "Action",
            cell: (info) => {
                console.log(info.row.original);
                return <UpdateCampModal campData={info.row.original} />;
            },
        },
        {
            id: "Delete",
            cell: (info) => {
                return (
                    <Button
                        variant="destructive"
                        onClick={() =>
                            deleteHandler(`${info.row.original._id}`)
                        }
                    >
                        Delete
                    </Button>
                );
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

export default ManageCamps;

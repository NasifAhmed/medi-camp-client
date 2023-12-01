import AnimationWrapper from "@/components/AnimationWrapper";
import FeedbackModal from "@/components/FeedbackModal";
import { useAxios } from "@/hooks/useAxios";
import { RegisteredParticipant } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { DataTable } from "../components/DataTable";

function FeedbackTable() {
    const axios = useAxios();

    const queryResponse = useQuery({
        queryKey: ["registered camps", "feedback"],
        queryFn: async (): Promise<RegisteredParticipant[] | null> => {
            try {
                const res = await axios.get(
                    "/registered?payment_status=true&confirmation_status=true"
                );
                return res.data;
            } catch (error) {
                console.log(
                    `Error while fetching registered camp data : ${error}`
                );
                return null;
            }
        },
    });

    const columns: ColumnDef<RegisteredParticipant>[] = [
        {
            accessorKey: "registered_camp.name",
            header: "Camp Name",
        },
        {
            accessorKey: "registered_camp.date",
            header: "Date and Time",
            cell: (info: any) => {
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
                    return <span>Not Paid</span>;
                }
            },
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
            id: "Review",
            header: "Action",
            cell: (info: any) => {
                return (
                    <FeedbackModal campId={info.row.original.registered_camp} />
                );
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

export default FeedbackTable;

import AnimationWrapper from "@/components/AnimationWrapper";
import Spinner from "@/components/Spinner";
import { useAxios } from "@/hooks/useAxios";
import { Payment } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { DataTable } from "../components/DataTable";

function PaymentHistory() {
    const axios = useAxios();

    const queryResponse = useQuery({
        queryKey: ["payment", "history"],
        queryFn: async (): Promise<Payment[] | null> => {
            try {
                const res = await axios.get("/payment");
                return res.data;
            } catch (error) {
                console.log(`Error while fetching payment data : ${error}`);
                return null;
            }
        },
    });

    const columns: ColumnDef<Payment>[] = [
        {
            accessorKey: "camp.name",
            header: "Camp Name",
        },
        {
            accessorKey: "camp.date",
            header: "Date and Time",
            cell: (info: any) => {
                return DateTime.fromISO(info.getValue()).toLocaleString(
                    DateTime.DATETIME_MED
                );
            },
        },
        {
            accessorKey: "camp.venue",
            header: "Venue",
        },
        {
            accessorKey: "camp.fees",
            header: "Fees",
            cell: (info) => {
                return `$${info.getValue()}`;
            },
        },
        {
            accessorKey: "transaction_id",
            header: "Transaction ID",
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

export default PaymentHistory;

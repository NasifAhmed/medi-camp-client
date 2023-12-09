import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import Spinner from "./Spinner";
function TestimonialCard({ data }: { data: any }) {
    console.log("Data:", data); // Log the data prop to the console
    return (
        <>
            {data ? (
                <Card>
                    <CardHeader>
                        <CardDescription>
                            About{" "}
                            <span className="font-semibold">
                                {data?.camp?.name}
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg">
                            <span>&quot;</span>
                            <blockquote className="inline">
                                {data?.text}
                            </blockquote>
                            <span>&quot;</span>
                        </p>
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm">
                            -{" "}
                            <span>
                                {data?.owner?.name}
                                <br /> {data?.createdAt}
                            </span>
                        </p>
                    </CardFooter>
                </Card>
            ) : (
                <Spinner condition={data === null || data === undefined} />
            )}
        </>
    );
}

export default TestimonialCard;

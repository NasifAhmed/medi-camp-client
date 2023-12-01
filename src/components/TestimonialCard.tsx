import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
function TestimonialCard({ data }: { data: any }) {
    return (
        <Card>
            <CardHeader>
                <CardDescription>
                    About{" "}
                    <span className="font-semibold">{data.camp.name}</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-lg">
                    <span>&quot;</span>
                    <blockquote className="inline">{data.text}</blockquote>
                    <span>&quot;</span>
                </p>
            </CardContent>
            <CardFooter>
                <p className="text-sm">
                    -{" "}
                    <span>
                        {data.owner.name}
                        <br /> {data.createdAt}
                    </span>
                </p>
            </CardFooter>
        </Card>
    );
}

export default TestimonialCard;

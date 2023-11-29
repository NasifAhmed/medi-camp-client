import AnimationWrapper from "./AnimationWrapper";
import { Skeleton } from "./ui/skeleton";

function CampDetailsSkeleton() {
    return (
        <AnimationWrapper>
            <>
                <div className="flex flex-col space-y-5 max-w-3xl mx-auto">
                    <Skeleton className="w-10 justify-center" />
                    <Skeleton className="w-200 h-1000"></Skeleton>
                    <h2 className="text-lg">
                        <span className="font-bold">Date & Time: </span>
                        Text
                    </h2>
                    <h2 className="text-lg">
                        <span className="font-bold">Venue : </span>
                        Text
                    </h2>
                    <h2 className="text-lg">
                        <span className="font-bold">Target audience : </span>
                        Text
                    </h2>
                    <h2 className="text-lg">
                        <span className="font-bold">Fees : </span>$ Text
                    </h2>
                    <h2 className="text-lg">
                        <span className="font-bold">Participants : </span>
                        Text
                    </h2>
                    <h2 className="text-lg">
                        <span className="font-bold">Purpose : </span>
                        Text
                    </h2>
                    <h2 className="text-lg">
                        <span className="font-bold">Benefits : </span>
                        Text
                    </h2>
                    DESCRIPTION
                    <h2 className="text-lg">
                        <span className="font-bold">
                            Specialized Services :{" "}
                        </span>
                        Text
                    </h2>
                    <>
                        <h2 className="text-lg font-bold">
                            Attended Healthcare Professionals :
                        </h2>
                        <ol className="list-decimal ml-10">
                            <li>Text Text</li>
                        </ol>
                    </>
                </div>
                <div className="flex justify-around mt-10">
                    <>Button</>
                    <>Button</>
                </div>
            </>
        </AnimationWrapper>
    );
}

export default CampDetailsSkeleton;

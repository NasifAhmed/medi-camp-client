import { useAxios } from "@/hooks/useAxios";
import { UserContext } from "@/providers/UserProvider";
import { Camp, RegisteredParticipant } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";

function JoinUpcomingCampForm({
    modalControl,
    campData,
}: {
    modalControl: React.Dispatch<React.SetStateAction<boolean>>;
    campData: Camp;
}) {
    const { userFromDB } = useContext(UserContext);

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<RegisteredParticipant>();

    const axios = useAxios();

    // const currentParticipantQuery = useQuery({
    //     queryKey: ["currentParticipant", authContext.user.email],
    //     queryFn: async () => {
    //         const response = await axios.get<Participant>("/user");
    //         return response.data;
    //     },
    // });
    const queryClient = useQueryClient();

    const userMutation = useMutation({
        mutationFn: (payload: any) =>
            axios
                .post("/upcomingcamp", payload)
                .then((res) => console.log(`Post query response ${res}`)),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["camp"],
            });
        },
    });

    const submitHandler = async () => {
        const upcomingCamp: any = {
            ...campData,
        };
        if (userFromDB?.role === "doctor") {
            upcomingCamp.doctors_interested.push(userFromDB._id);
        } else {
            upcomingCamp.participants_interested.push(userFromDB?._id);
        }

        toast.promise(
            userMutation
                .mutateAsync(upcomingCamp)
                .then(() => {
                    console.log("Joined successfully");
                    modalControl(false);
                })
                .catch((error) => {
                    console.error(error);
                }),
            {
                loading: "Loading...",
                success: `Joined successfully !`,
                error: "Error : Could not join !",
            }
        );

        reset();
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-4 md:mx-auto">
            {/* <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials below to register
            </p> */}
            <div className="grid gap-6 w-full">
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <div>
                        <Button
                            type="submit"
                            className={`w-full ${isSubmitting && `disabled`}`}
                        >
                            Join
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default JoinUpcomingCampForm;

import { useAxios } from "@/hooks/useAxios";
import { UserContext } from "@/providers/UserProvider";
import { Camp, RegisteredParticipant } from "@/types/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

function JoinCampForm({
    modalControl,
    campData,
}: {
    modalControl: React.Dispatch<React.SetStateAction<boolean>>;
    campData: Camp;
}) {
    const { userFromDB } = useContext(UserContext);

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
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
                .post("/registered", payload)
                .then((res) => console.log(`Post query response ${res}`)),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["camp"],
            });
        },
    });
    const userInCampMutation = useMutation({
        mutationFn: (payload: any) =>
            axios
                .post("/camp", payload)
                .then((res) => console.log(`Post query response ${res}`)),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["camp"],
            });
        },
    });

    const submitHandler = async (data: RegisteredParticipant) => {
        const registeredUser = {
            name: userFromDB?.name,
            email: userFromDB?.email,
            emergency_phone_number: data.emergency_phone_number,
            requirments: data.requirments,
            registered_camp: campData._id,
            price: campData.fees,
            payment_status: false,
            confirmation_status: false,
        };
        const registeredUserInCamp: any = {
            ...campData,
        };
        registeredUserInCamp.participants.push(userFromDB?._id);

        toast.promise(
            userMutation
                .mutateAsync(registeredUser)
                .then(() => {
                    console.log("Joined successfully");
                    userInCampMutation.mutateAsync(registeredUserInCamp);
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

        console.log(data);
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
                        <Label>Enter your emergency phone number :</Label>
                        <Controller
                            control={control}
                            name="emergency_phone_number"
                            defaultValue=""
                            rules={{
                                required: "Phone number is required",
                                pattern: {
                                    //Check for general phone numbers
                                    value: /^\+(?:[0-9] ?){6,14}[0-9]$/,
                                    message: "Invalid number",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="emergency_phone"
                                    type="tel"
                                    placeholder="+8801XXXNNNNNN"
                                />
                            )}
                        />
                        {errors.emergency_phone_number && (
                            <span className="text-destructive">
                                {errors.emergency_phone_number.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>
                            Enter your special need/requirments if have any :
                        </Label>
                        <Controller
                            control={control}
                            name="requirments"
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="requirments"
                                    placeholder="Enter your requirments"
                                    type="text"
                                />
                            )}
                        />
                        {errors.requirments && (
                            <span className="text-destructive">
                                {errors.requirments.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className={`w-full ${isSubmitting && `disabled`}`}
                        >
                            Submit & Join
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default JoinCampForm;

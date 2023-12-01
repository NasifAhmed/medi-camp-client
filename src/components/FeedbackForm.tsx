import { useAxios } from "@/hooks/useAxios";
import { Feedback } from "@/types/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { useContext } from "react";
import { UserContext } from "@/providers/UserProvider";

function FeedbackForm({
    modalControl,
    campId,
}: {
    modalControl: React.Dispatch<React.SetStateAction<boolean>>;
    campId: string;
}) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Feedback>();

    const axios = useAxios();

    // const currentParticipantQuery = useQuery({
    //     queryKey: ["currentParticipant", authContext.user.email],
    //     queryFn: async () => {
    //         const response = await axios.get<Participant>("/user");
    //         return response.data;
    //     },
    // });
    const queryClient = useQueryClient();

    const feedbackMutation = useMutation({
        mutationFn: async (payload: Feedback) => {
            await axios
                .post(`/feedback`, payload)
                .then((res) => {
                    console.log(`Feedback insert response : `, res);
                })
                .catch((e) => console.log(`Feedback insert error : `, e));
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["feedback", "insert"],
            });
        },
    });

    const { userFromDB } = useContext(UserContext);
    const submitHandler = async (data: Feedback) => {
        const feedbackData: any = {
            owner: userFromDB?._id,
            camp: campId,
            text: data.text,
            img: data.img,
            rating: data.rating,
        };

        toast.promise(
            feedbackMutation
                .mutateAsync(feedbackData)
                .then(() => {
                    console.log("Submitted successfully");
                    modalControl(false);
                })
                .catch((error) => {
                    console.error(error);
                }),
            {
                loading: "Loading...",
                success: `Submitted successfully !`,
                error: "Error : Could not submit !",
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
                        <Label>Select your rating :</Label>
                        <Controller
                            control={control}
                            name="rating"
                            rules={{
                                required: "Role is required",
                            }}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue=""
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Your rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[1, 2, 3, 4, 5].map((data, index) => {
                                            return (
                                                <SelectItem
                                                    key={index}
                                                    value={data.toString()}
                                                >
                                                    {data}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.rating && (
                            <span className="text-destructive">
                                {errors.rating.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Controller
                            control={control}
                            name="text"
                            defaultValue=""
                            rules={{
                                required: "This field is required",
                            }}
                            render={({ field }) => (
                                <Textarea
                                    placeholder="Your feedback"
                                    id="text"
                                    // className="resize-none"
                                    {...field}
                                />
                            )}
                        />
                        {errors.text && (
                            <span className="text-destructive">
                                {errors.text.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className={`w-full ${isSubmitting && `disabled`}`}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FeedbackForm;

import DateTimePicker from "@/components/ui/DateTimeTest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAxios } from "@/hooks/useAxios";
import { UserContext } from "@/providers/UserProvider";
import { Camp } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { toast } from "sonner";

function UpdateCampForm({
    modalControl,
    campData,
}: {
    modalControl: React.Dispatch<React.SetStateAction<boolean>>;
    campData: Camp;
}) {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Add Camp | Medi Camp");
    }, [setTitle]);

    const { userFromDB } = useContext(UserContext);
    //Date state for the DateTimePicker component
    const [date, setDate] = useState<Date>(
        DateTime.fromISO(campData.date).toJSDate()
    );

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Camp>();

    const axios = useAxios();
    const queryClient = useQueryClient();

    const campMutation = useMutation({
        mutationFn: async (payload: Camp) => {
            await axios
                .post(`/camp?_id=${campData._id}`, payload)
                .then((res) => {
                    console.log(`Camp post response ${res}`);
                })
                .catch((e) => console.log(`Camp post error : ${e}`));
        },
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["all camps", "manage"],
            });
        },
    });

    const submitHandler = async (data: Camp) => {
        const camp: any = {
            _id: campData._id,
            name: data.name,
            fees: data.fees,
            created_by: userFromDB?._id,
            img: campData.img,
            date: date.toISOString(),
            venue: data.venue,
            special_service: data.special_service,
            purpose: data.purpose,
            benefits: data.benefits,
            target_audience: data.target_audience,
            desc: data.desc,
            phone_number: data.phone_number,
        };

        console.log(camp);
        toast.promise(
            // imgBBupload(data.img)
            //     .then((res) => {
            // console.log(
            //     `ImageBB upload response ${JSON.stringify(res)}`
            // );

            campMutation.mutateAsync(camp),
            // })
            // .catch((e) => console.log(`ImgBB upload error : ${e}`)),
            {
                loading: "Updating camp data...",
                success: `Camp updated !`,
                error: "Error : Could not updated !",
            }
        );
        modalControl(false);
        console.log(data);
        reset();
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit(submitHandler)}>
            <div>
                <Label htmlFor="name">Camp Name</Label>
                <Controller
                    control={control}
                    name="name"
                    defaultValue={campData.name}
                    rules={{
                        required: "Name is required",
                        pattern: {
                            //Check for at least three characters, maximum 20 words and max 200 characters
                            value: /^(?:\b\w{3,20}\b\s*){1,5}$/,
                            message: "Invalid name",
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id="name"
                            placeholder="Medical camp"
                            type="text"
                        />
                    )}
                />
                {errors.name && (
                    <span className="text-destructive">
                        {errors.name.message}
                    </span>
                )}
            </div>
            {/* <div>
                <Label htmlFor="img">Image</Label>
                <Controller
                    control={control}
                    name="img"
                    rules={{
                        required: "An image is required",
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            value={field.value?.filename}
                            onChange={(event) => {
                                field.onChange(event.target.files[0]);
                            }}
                            id="img"
                            type="file"
                        />
                    )}
                />
                {errors.img && (
                    <span className="text-destructive">
                        {errors.img.message}
                    </span>
                )}
            </div> */}
            <div>
                <Label htmlFor="fees">Fees($)</Label>
                <Controller
                    control={control}
                    name="fees"
                    defaultValue={campData.fees}
                    rules={{
                        required: "Feees are mandatory, enter 0 if free",
                        pattern: {
                            //Check for at least 0, non-negative and max 100000
                            value: /^(?:0|[1-9]\d{0,5})$/,
                            message: "Invalid amount",
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id="fees"
                            type="number"
                            placeholder="100"
                        />
                    )}
                />
                {errors.fees && (
                    <span className="text-destructive">
                        {errors.fees.message}
                    </span>
                )}
            </div>
            <div>
                <Label htmlFor="date">Date and Time</Label>
                <br />
                <DateTimePicker date={date} setDate={setDate} />
            </div>
            <div>
                <Label>Venue Location</Label>
                <Controller
                    control={control}
                    name="venue"
                    defaultValue={campData.venue}
                    rules={{
                        required: "Venue is required",
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id="venue"
                            type="text"
                            placeholder="Area/Building No., Street, City, State, Country"
                        />
                    )}
                />
                {errors.venue && (
                    <span className="text-destructive">
                        {errors.venue.message}
                    </span>
                )}
            </div>
            <div>
                <Label htmlFor="phone_number">Phone Number</Label>
                <Controller
                    control={control}
                    name="phone_number"
                    defaultValue={campData.phone_number}
                    rules={{
                        required: "Phone number is required",
                        pattern: {
                            //Check for phone numbers
                            value: /^\+?\d[-.\s()]?\d{1,}$/,
                            message: "Invalid number",
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id="phone_number"
                            type="tel"
                            placeholder="+880 1XXX NNNNNN"
                        />
                    )}
                />
                {errors.phone_number && (
                    <span className="text-destructive">
                        {errors.phone_number.message}
                    </span>
                )}
            </div>
            <div>
                <Label htmlFor="special_service">Specialized Service</Label>
                <Controller
                    control={control}
                    name="special_service"
                    defaultValue={campData.special_service}
                    rules={{
                        required: "This field is required",
                    }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            id="special_service"
                            type="text"
                            placeholder="Surgery, dental, testing...."
                        />
                    )}
                />
                {errors.special_service && (
                    <span className="text-destructive">
                        {errors.special_service.message}
                    </span>
                )}
            </div>
            <div>
                <Label htmlFor="purpose">Purpose</Label>
                <Controller
                    control={control}
                    name="purpose"
                    defaultValue={campData.purpose}
                    rules={{}}
                    render={({ field }) => (
                        <Textarea
                            placeholder="Purpose of the camp in brief"
                            id="purpose"
                            // className="resize-none"
                            {...field}
                        />
                    )}
                />
                {errors.purpose && (
                    <span className="text-destructive">
                        {errors.purpose.message}
                    </span>
                )}
            </div>
            <div>
                <Label htmlFor="benefits">Benefits</Label>
                <Controller
                    control={control}
                    name="benefits"
                    defaultValue={campData.benefits}
                    rules={{}}
                    render={({ field }) => (
                        <Textarea
                            placeholder="Benefits of attending this camp"
                            id="benefits"
                            // className="resize-none"
                            {...field}
                        />
                    )}
                />
                {errors.benefits && (
                    <span className="text-destructive">
                        {errors.benefits.message}
                    </span>
                )}
            </div>
            <div>
                <Label htmlFor="target_audience">Target Audience</Label>
                <Controller
                    control={control}
                    name="target_audience"
                    defaultValue={campData.target_audience}
                    rules={{
                        required: "This field is required",
                    }}
                    render={({ field }) => (
                        <RadioGroup
                            {...field}
                            id="targe_audience"
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="Children(5-18)"
                                    id="option-one"
                                />
                                <Label htmlFor="option-one">
                                    Children(5-18)
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="Adult(18-50)"
                                    id="option-two"
                                />
                                <Label htmlFor="option-two">Adult(18-50)</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="Elderly(50+)"
                                    id="option-three"
                                />
                                <Label htmlFor="option-three">
                                    Elderly(50+)
                                </Label>
                            </div>
                        </RadioGroup>
                    )}
                />
                {errors.target_audience && (
                    <span className="text-destructive">
                        {errors.target_audience.message}
                    </span>
                )}
            </div>
            <div>
                <Label htmlFor="desc">Description</Label>
                <Controller
                    control={control}
                    name="desc"
                    defaultValue={campData.desc}
                    rules={{
                        required: "This field is required",
                    }}
                    render={({ field }) => (
                        <Textarea
                            placeholder="A short description of the camp"
                            id="desc"
                            // className="resize-none"
                            {...field}
                        />
                    )}
                />
                {errors.desc && (
                    <span className="text-destructive">
                        {errors.desc.message}
                    </span>
                )}
            </div>
            <Button
                type="submit"
                className={`w-full ${isSubmitting && `disabled`}`}
            >
                Update Camp
            </Button>
            {/* <DevTool control={control} /> */}
        </form>
    );
}

export default UpdateCampForm;

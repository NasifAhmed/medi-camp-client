import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAxios } from "@/hooks/useAxios";
import { AuthContext } from "@/providers/AuthProvider";
import { UserContext } from "@/providers/UserProvider";
import { Doctor, Organizer, Participant } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "sonner";

type Participant_input = Omit<
    Participant,
    "_id" | "attended_camps" | "registered_camps"
> & { password: string };
type Doctor_input = Omit<
    Doctor,
    "_id" | "interested_camps" | "accepted_camps"
> & { password: string };
type Organizer_input = Omit<
    Organizer,
    "_id" | "organized_camps" | "feedbacks"
> & { password: string };
type Inputs = Organizer_input & Doctor_input & Participant_input;
type registerUser =
    | Omit<Organizer_input, "password">
    | Omit<Doctor_input, "password">
    | Omit<Participant_input, "password">;

function UpdateProfileForm() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("SignUp | Medi Camp");
    }, [setTitle]);

    const authContext = useContext(AuthContext);
    const { userFromDB } = useContext(UserContext);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<Inputs>();

    const navigate = useNavigate();
    const locationState = useLocation();
    const axios = useAxios();

    const queryClient = useQueryClient();
    const userMutation = useMutation({
        mutationFn: (payload: registerUser) =>
            axios
                .post("/user", payload)
                .then((res) => console.log(`Post query response ${res}`)),
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: ["userFromDB", authContext.user?.email],
            });
        },
    });

    const submitHandler = async (data: Inputs) => {
        let registeringUser: registerUser;
        if (data.role === "organizer") {
            registeringUser = {
                role: data.role,
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
            };
        } else if (data.role === "doctor") {
            registeringUser = {
                role: data.role,
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                speciality: data.speciality,
                certification: data.certification,
            };
        } else if (data.role === "participant") {
            registeringUser = {
                role: data.role,
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                address: data.address,
                age: data.age,
                gender: data.gender,
                requirments: data.requirments,
            };
        }
        toast.promise(userMutation.mutateAsync(registeringUser), {
            loading: "Loading...",
            success: `User registered !`,
            error: "Error : Could not register !",
        });

        console.log(data);
        reset();
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-4 md:mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">
                Update Profile
            </h1>
            <div className="grid gap-6 w-full">
                {userFromDB && (
                    <>
                        <form
                            className="space-y-4"
                            onSubmit={handleSubmit(submitHandler)}
                        >
                            <div>
                                <Label>Name</Label>
                                <Controller
                                    control={control}
                                    name="name"
                                    defaultValue={userFromDB.name}
                                    rules={{
                                        required: "Name is required",
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="name"
                                            placeholder="Your Name"
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
                            <div>
                                <Label>Email</Label>
                                <Controller
                                    control={control}
                                    name="email"
                                    defaultValue={userFromDB.email}
                                    rules={{
                                        required: "Email is required",
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            autoComplete="email"
                                        />
                                    )}
                                />
                                {errors.email && (
                                    <span className="text-destructive">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                            {/* TODO : Add different way to change password later */}
                            {/* <div>
                        <Label>Password</Label>
                        <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            rules={{
                                required: "Password is mandatory",
                                minLength: {
                                    value: 6,
                                    message:
                                        "Password needs minimum 6 characters",
                                },
                                maxLength: {
                                    value: 25,
                                    message: "Password too long",
                                },
                                pattern: {
                                    value: /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/,
                                    message:
                                        "At lease one special character needed",
                                },
                            }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="password"
                                    type="password"
                                    placeholder="password"
                                />
                            )}
                        />
                        {errors.password && (
                            <span className="text-destructive">
                                {errors.password.message}
                            </span>
                        )}
                    </div> */}
                            <div>
                                <Label>Phone Number</Label>
                                <Controller
                                    control={control}
                                    name="phone_number"
                                    defaultValue={userFromDB.phone_number}
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
                                            id="phone"
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
                            {watch("role") === "participant" && (
                                <>
                                    <div>
                                        <Label>Age</Label>
                                        <Controller
                                            control={control}
                                            name="age"
                                            defaultValue={userFromDB.info.age}
                                            rules={{
                                                required: "Age is required",
                                                min: {
                                                    value: 5,
                                                    message:
                                                        "Children below 5 are not allowed",
                                                },
                                                max: {
                                                    value: 150,
                                                    message: "Invalid age",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    id="age"
                                                    type="number"
                                                    placeholder="8-150"
                                                />
                                            )}
                                        />
                                        {errors.age && (
                                            <span className="text-destructive">
                                                {errors.age.message}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Select your gender :</Label>

                                        <Controller
                                            control={control}
                                            name="gender"
                                            defaultValue={
                                                userFromDB.info.gender
                                            }
                                            rules={{
                                                required:
                                                    "Gender choice is required",
                                            }}
                                            render={({ field }) => (
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue=""
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Your gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="male">
                                                            Male
                                                        </SelectItem>
                                                        <SelectItem value="female">
                                                            Female
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        {errors.gender && (
                                            <span className="text-destructive">
                                                {errors.gender.message}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Address</Label>
                                        <Controller
                                            control={control}
                                            name="address"
                                            defaultValue={
                                                userFromDB.info.address
                                            }
                                            rules={{
                                                required: "Address is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    id="address"
                                                    type="text"
                                                    placeholder="Street, City, State, Country"
                                                />
                                            )}
                                        />
                                        {errors.address && (
                                            <span className="text-destructive">
                                                {errors.address.message}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                            {watch("role") === "doctor" && (
                                <>
                                    <div>
                                        <Label>Medical Speciality</Label>
                                        <Controller
                                            control={control}
                                            name="speciality"
                                            defaultValue={
                                                userFromDB.info.speciality
                                            }
                                            rules={{
                                                required:
                                                    "Specialization is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    id="speciality"
                                                    type="text"
                                                    placeholder="Cardiology"
                                                />
                                            )}
                                        />
                                        {errors.speciality && (
                                            <span className="text-destructive">
                                                {errors.speciality.message}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Certifications</Label>
                                        <Controller
                                            control={control}
                                            name="certification"
                                            defaultValue={
                                                userFromDB.info.certification
                                            }
                                            rules={{
                                                required:
                                                    "Certification is required",
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    id="certification"
                                                    type="text"
                                                    placeholder="MD Cardiology"
                                                />
                                            )}
                                        />
                                        {errors.certification && (
                                            <span className="text-destructive">
                                                {errors.certification.message}
                                            </span>
                                        )}
                                    </div>
                                </>
                            )}
                            <Button
                                type="submit"
                                className={`w-full ${
                                    isSubmitting && `disabled`
                                }`}
                            >
                                Update Profile
                            </Button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default UpdateProfileForm;

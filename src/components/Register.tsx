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
import { Doctor, Organizer, Participant } from "@/types/types";
import { useMutation } from "@tanstack/react-query";
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

function Register() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Register | Medi Camp");
    }, [setTitle]);

    const authContext = useContext(AuthContext);

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

    const userMutation = useMutation({
        mutationFn: (payload: registerUser) =>
            axios
                .post("/user", payload)
                .then((res) => console.log(`Post query response ${res}`)),
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
        toast.promise(
            authContext
                .createUser(data.email, data.password)
                .then((result) => {
                    console.log(result.user);
                    authContext.updateUser(result.user, data.name);
                })
                .then(() => {
                    userMutation.mutateAsync(registeringUser);
                })
                .then(() => {
                    console.log("User profile created successfully");
                    navigate(locationState ? locationState : "/");
                })
                .catch((error) => {
                    console.error(error);
                }),
            {
                loading: "Loading...",
                success: `User registered !`,
                error: "Error : Could not register !",
            }
        );

        console.log(data);
        reset();
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-4 md:mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials below to register
            </p>
            <div className="grid gap-6 w-full">
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(submitHandler)}
                >
                    <div>
                        <Label>Select your desired role :</Label>
                        <Controller
                            control={control}
                            name="role"
                            rules={{
                                required: "Role is required",
                            }}
                            render={({ field }) => (
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue=""
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Your role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="organizer">
                                            Organizer
                                        </SelectItem>
                                        <SelectItem value="participant">
                                            Participant
                                        </SelectItem>
                                        <SelectItem value="doctor">
                                            Healthcare Professional
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.role && (
                            <span className="text-destructive">
                                {errors.role.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Controller
                            control={control}
                            name="email"
                            defaultValue=""
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
                    <div>
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
                    </div>
                    <div>
                        <Label>Phone Number</Label>
                        <Controller
                            control={control}
                            name="phone_number"
                            defaultValue=""
                            rules={{
                                required: "Phone number is required",
                                minLength: {
                                    value: 7,
                                    message:
                                        "Phone numbers should be at least 7 digits",
                                },
                                maxLength: {
                                    value: 15,
                                    message:
                                        "Phone numbers can not be more than 15 digits",
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
                                    defaultValue={0}
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
                                    rules={{
                                        required: "Gender choice is required",
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            onValueChange={field.onChange}
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
                                    defaultValue=""
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
                            <div>
                                <Label>Any special requirments you need</Label>
                                <Controller
                                    control={control}
                                    name="requirments"
                                    defaultValue=""
                                    rules={{
                                        required: false,
                                    }}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            id="requirments"
                                            type="text"
                                            placeholder="Describe your requirments in short"
                                        />
                                    )}
                                />
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
                                    defaultValue=""
                                    rules={{
                                        required: "Specialization is required",
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
                                {errors.requirments && (
                                    <span className="text-destructive">
                                        {errors.requirments.message}
                                    </span>
                                )}
                            </div>
                            <div>
                                <Label>Certifications</Label>
                                <Controller
                                    control={control}
                                    name="certification"
                                    defaultValue=""
                                    rules={{
                                        required: "Certification is required",
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
                        className={`w-full ${isSubmitting && `disabled`}`}
                    >
                        Register
                    </Button>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    Already have an account ?{" "}
                    <span
                        className="underline underline-offset-4 hover:text-primary font-semibold cursor-pointer"
                        onClick={() => navigate("/login")}
                    >
                        login
                    </span>
                    .
                </p>
            </div>
        </div>
    );
}

export default Register;

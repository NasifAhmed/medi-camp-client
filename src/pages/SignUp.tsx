import AnimationWrapper from "@/components/AnimationWrapper";
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
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "sonner";

// type Participant_input = Omit<
//     Participant,
//     "_id" | "attended_camps" | "registered_camps"
// > & { password: string };
// type Doctor_input = Omit<
//     Doctor,
//     "_id" | "interested_camps" | "accepted_camps"
// > & { password: string };
// type Organizer_input = Omit<
//     Organizer,
//     "_id" | "organized_camps" | "feedbacks"
// > & { password: string };
// type Inputs = Organizer_input & Doctor_input & Participant_input;
// type registerUser =
//     | Omit<Organizer_input, "password">
//     | Omit<Doctor_input, "password">
//     | Omit<Participant_input, "password">;

function SignUp() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("SignUp | Medi Camp");
    }, [setTitle]);

    const authContext = useContext(AuthContext);

    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<any>();

    const navigate = useNavigate();
    const locationState = useLocation().state;
    const axios = useAxios();

    const userMutation = useMutation({
        mutationFn: (payload: any) =>
            axios
                .post("/user", payload)
                .then((res) => console.log(`Post query response ${res}`)),
    });

    const submitHandler = async (data: any) => {
        let registeringUser: any;
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
                    navigate(locationState ? locationState : "/dashboard");
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
        <AnimationWrapper>
            {" "}
            <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-4 md:mx-auto">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Sign Up
                </h1>
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
                                    {errors.role.message as string}
                                </span>
                            )}
                        </div>
                        <div>
                            <Label>Name</Label>
                            <Controller
                                control={control}
                                name="name"
                                defaultValue=""
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
                                    {errors.name.message as string}
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
                                    {errors.email.message as string}
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
                                    {errors.password.message as string}
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
                                    {errors.phone_number.message as string}
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
                                            {errors.age.message as string}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <Label>Select your gender :</Label>

                                    <Controller
                                        control={control}
                                        name="gender"
                                        rules={{
                                            required:
                                                "Gender choice is required",
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
                                            {errors.gender.message as string}
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
                                            {errors.address.message as string}
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
                                        defaultValue=""
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
                                            {
                                                errors.speciality
                                                    .message as string
                                            }
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
                                            {
                                                errors.certification
                                                    .message as string
                                            }
                                        </span>
                                    )}
                                </div>
                            </>
                        )}
                        <Button
                            type="submit"
                            className={`w-full ${isSubmitting && `disabled`}`}
                        >
                            Sign Up
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
        </AnimationWrapper>
    );
}

export default SignUp;

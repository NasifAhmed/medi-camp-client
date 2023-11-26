import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { Controller, useForm } from "react-hook-form";

import { toast } from "sonner";
import { useAxios } from "@/hooks/useAxios";
import { useMutation } from "@tanstack/react-query";

type loginData = {
    email: string;
    password: string;
};

function Login() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Login | Medi Camp");
    }, [setTitle]);

    const locationState = useLocation();
    const [error, setError] = useState();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<loginData>();

    const navigate = useNavigate();

    const authContext = useContext(AuthContext);

    const submitHandler = async (data: loginData) => {
        console.log(`Trying to log in ${data}`);
        toast.promise(
            authContext
                .signIn(data.email, data.password)
                .then((result) => {
                    console.log(result.user);
                    navigate(locationState ? locationState : "/");
                })
                .catch((error) => {
                    setError(error.message);
                    console.error(error);
                }),
            {
                loading: "Logging in...",
                success: "Log in successful!",
                error: "Could not log in.",
            }
        );
    };

    // const axios = useAxios();

    // const googleLoginHandler = async () => {
    //     toast.promise(
    //         authContext
    //             .googleSignIn()
    //             .then((result) => {
    //                 console.log(result.user);
    //                 navigate(locationState ? locationState : "/");
    //             })
    //             .catch((error) => {
    //                 setError(error.message);
    //                 console.error(error);
    //             }),
    //         {
    //             loading: "Logging in...",
    //             success: "Log in successful!",
    //             error: "Could not log in.",
    //         }
    //     );
    // };

    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-4 md:mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials below to log in
            </p>
            <div className="grid gap-6 w-full">
                <form
                    className="space-y-4"
                    onSubmit={handleSubmit(submitHandler)}
                >
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
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Controller
                            control={control}
                            name="password"
                            defaultValue=""
                            rules={{
                                required: "Password is mandatory",
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
                    </div>
                    {error && <span className="text-destructive">{error}</span>}
                    <Button type="submit" className="w-full">
                        Log In
                    </Button>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    Don't have an account ?{" "}
                    <span
                        className="underline underline-offset-4 hover:text-primary font-semibold cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        sign up
                    </span>
                    .
                </p>
                {/* <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Button
                    variant="outline"
                    type="button"
                    onClick={googleLoginHandler}
                >
                    Google
                </Button> */}
            </div>
        </div>
    );
}

export default Login;

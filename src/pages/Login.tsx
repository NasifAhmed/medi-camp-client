import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import AnimationWrapper from "@/components/AnimationWrapper";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import { toast } from "sonner";

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

    const locationState = useLocation().state;
    const [error, setError] = useState();
    const { control, handleSubmit } = useForm<loginData>();

    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const authContext = useContext(AuthContext);

    const submitHandler = async (data: loginData) => {
        console.log(`Trying to log in ${data}`);
        authContext
            .signIn(data.email, data.password)
            .then(async (result) => {
                console.log(result.user);
                const jwtUser = { email: result.user.email };
                await axiosSecure.post("/get-token", jwtUser);
                toast.success("Log in successful !");
                navigate(locationState ? locationState : `/dashboard`);
            })
            .catch((error) => {
                setError(error.message);
                toast.error("Log in failed !");
                console.error(error);
            });
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
        <AnimationWrapper>
            <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-4 md:mx-auto">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Log In
                </h1>
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
                        {error && (
                            <span className="text-destructive">{error}</span>
                        )}
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
        </AnimationWrapper>
    );
}

export default Login;

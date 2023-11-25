import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";

function Login() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Login | Medi Camp");
    }, [setTitle]);

    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-4 md:mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">Log In</h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials below to log in
            </p>
            <div className="grid gap-6 w-full">
                <form className="space-y-4">
                    <div>
                        <Label>Email</Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoComplete="email"
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="password"
                        />
                    </div>
                    <Button type="button" className="w-full">
                        Log In
                    </Button>
                </form>
                <p className="px-8 text-center text-sm text-muted-foreground">
                    Don't have an account ?{" "}
                    <span
                        className="underline underline-offset-4 hover:text-primary font-semibold cursor-pointer"
                        onClick={() => navigate("/register")}
                    >
                        register
                    </span>
                    .
                </p>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>
                <Button variant="outline" type="button">
                    Google
                </Button>
            </div>
        </div>
    );
}

export default Login;

import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

type role = "organizer" | "participant" | "doctor" | null;

function Register() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Register | Medi Camp");
    }, [setTitle]);

    const [role, setRole] = useState<role>(null);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center gap-4 max-w-xs mx-4 md:mx-auto">
            <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials below to register
            </p>
            <div className="grid gap-6 w-full">
                <form className="space-y-4">
                    <div>
                        <Label>Select your desired role :</Label>
                        <Select
                            value={role as string}
                            onValueChange={(v) => setRole(v as role)}
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
                    </div>

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
                    <div>
                        <Label>Phone Number</Label>
                        <Input
                            id="phone"
                            type="tel"
                            placeholder="+880 1XXX NNNNNN"
                        />
                    </div>
                    {role === "participant" && (
                        <>
                            <div>
                                <Label>Select your gender :</Label>
                                <Select>
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
                            </div>
                            <div>
                                <Label>Address</Label>
                                <Input
                                    id="address"
                                    type="text"
                                    placeholder="Street, City, State, Country"
                                />
                            </div>
                        </>
                    )}
                    {role === "doctor" && (
                        <>
                            <div>
                                <Label>Medical Speciality</Label>
                                <Input
                                    id="speciality"
                                    type="text"
                                    placeholder="Cardiology"
                                />
                            </div>
                            <div>
                                <Label>Certifications</Label>
                                <Input
                                    id="certifications"
                                    type="text"
                                    placeholder="MD Cardiology"
                                />
                            </div>
                        </>
                    )}
                    <Button type="button" className="w-full">
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

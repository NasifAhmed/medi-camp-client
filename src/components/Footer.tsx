import { AuthContext } from "@/providers/AuthProvider";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import logo from "../assets/logo.png";

function Footer() {
    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    return (
        <div className="bg-secondary w-full mt-20 flex flex-col">
            <div className="md:h-44 flex flex-col md:flex-row">
                <div className="flex-grow p-14">
                    <div
                        className="flex-1 mr-auto flex-col gap-2 h-10"
                        onClick={() => navigate("/")}
                    >
                        <Avatar className="mr-2">
                            <AvatarImage className="w-20" src={logo} />
                            <Label className="text-lg">Medi Camp</Label>
                        </Avatar>
                    </div>
                </div>
                <div className="flex-grow p-14 flex-col space-y-2">
                    <div>
                        <NavLink to="/" className={"footer transition-colors"}>
                            Home
                        </NavLink>
                    </div>
                    {user && (
                        <>
                            <div>
                                <NavLink
                                    to="/available-camps"
                                    className={"footer transition-colors"}
                                >
                                    Available Camps
                                </NavLink>
                            </div>
                            <div>
                                <NavLink
                                    to="/dashboard"
                                    className={"footer transition-colors"}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </>
                    )}
                    <div>
                        <NavLink
                            to="/contact"
                            className={"footer transition-colors"}
                        >
                            Contact Us
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="pt-5 pb-6">
                <h3 className="w-full text-center">COPYRIGHT</h3>
            </div>
        </div>
    );
}

export default Footer;

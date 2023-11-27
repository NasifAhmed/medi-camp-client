import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { Label } from "./ui/label";
import { routes } from "@/router/NavigationRoutes";
import { ReactNode } from "react";

function Footer() {
    const navigate = useNavigate();

    return (
        <div className="bg-secondary w-full  mt-20">
            <div className="h-44 flex">
                <div className="flex-grow p-14">
                    <div
                        className="flex-1 mr-auto flex-col gap-2 h-10"
                        onClick={() => navigate("/")}
                    >
                        <Avatar className="mr-2">
                            <AvatarImage
                                className="w-20"
                                src="https://i.ibb.co/NmRFDbN/logo.png"
                            />
                            <Label className="text-lg">Medi Camp</Label>
                        </Avatar>
                    </div>
                </div>
                <div className="flex-grow p-14 flex-col space-y-2">
                    {routes.map((route, index) => (
                        <div key={index}>
                            <NavLink
                                to={route.route}
                                className={"footer transition-colors "}
                            >
                                {route.name}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pt-5 pb-6">
                <h3 className="w-full text-center">COPYRIGHT</h3>
            </div>
        </div>
    );
}

export default Footer;

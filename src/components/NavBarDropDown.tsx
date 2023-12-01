import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function NavBarDropDown() {
    const { user } = useContext(AuthContext);

    const navigate = useNavigate();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="md:hidden" asChild>
                <Button variant="outline" size="icon">
                    <Menu className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
                    {/* <ChevronRight className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
                    <span className="sr-only">Menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/")}>
                    Home
                </DropdownMenuItem>
                {user && (
                    <>
                        <DropdownMenuItem
                            onClick={() => navigate("/availlable-camps")}
                        >
                            Available Camps
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </DropdownMenuItem>
                    </>
                )}
                <DropdownMenuItem onClick={() => navigate("/contact")}>
                    Contact Us
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

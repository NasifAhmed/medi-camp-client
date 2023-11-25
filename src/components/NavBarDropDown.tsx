import { ChevronRight, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

type route = {
    name: string;
    route: string;
};

export function NavBarDropDown({ routes }: { routes: route[] }) {
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
                {routes.map((data, index) => (
                    <DropdownMenuItem
                        onClick={() => navigate(data.route)}
                        key={index}
                    >
                        {data.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { AuthContext } from "../providers/AuthProvider";
import { NavBarDropDown } from "./NavBarDropDown";
import { ThemeButton } from "./ThemeButton";
import { Button } from "./ui/button";
// import { useAxios } from "../hooks/useAxios";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAxiosSecure } from "@/hooks/useAxiosSecure";
import logo from "../assets/logo.png";

const NavBar = () => {
    // [dropDownState, setDropDownState] = useState([]);

    const { user, logOut } = useContext(AuthContext);
    // const axios = useAxios(true);
    const navigate = useNavigate();
    const axios = useAxiosSecure();
    const handleLogOut = () => {
        // const userEmail = user?.email;
        logOut()
            .then(() => {
                axios.post("/delete-token");
            })
            //         .then((res) => {
            //             if (tokenState) {
            //                 axios
            //                     .post(
            //                         "/delete-token",
            //                         { email: userEmail },
            //                         { withCredentials: true }
            //                     )
            //                     .then((res) => {
            //                         console.log(
            //                             `Token delete response ${JSON.stringify(res)}`
            //                         );
            //                         setTokenState(false);
            //                     });
            //             }
            //             console.log(res);
            //         })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <nav className="flex justify-between items-center mb-20 mt-6">
            <div
                className="flex-1 mr-auto flex-col gap-2"
                onClick={() => navigate("/")}
            >
                <Avatar className="mr-2">
                    <AvatarImage src={logo} />
                </Avatar>
                <h1 className="text-lg font-bold">Medi Camp</h1>
            </div>
            <div className="md:flex justify-between items-center gap-10 hidden text-xl font-semibold">
                <NavLink to="/" className={"navbar transition-colors"}>
                    Home
                </NavLink>
                {user && (
                    <>
                        <NavLink
                            to="/available-camps"
                            className={"navbar transition-colors"}
                        >
                            Available Camps
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className={"navbar transition-colors"}
                        >
                            Dashboard
                        </NavLink>
                    </>
                )}
                <NavLink to="/contact" className={"navbar transition-colors"}>
                    Contact Us
                </NavLink>
            </div>
            <div className="flex flex-1 ml-auto justify-end items-center gap-1">
                {user ? (
                    <div className="flex text-xs md:text-base items-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar className="mr-2">
                                    <AvatarImage
                                        src={
                                            user.photoURL as string | undefined
                                        }
                                    />
                                    <AvatarFallback>
                                        <img
                                            src="https://i.ibb.co/dWbbNfk/fallback.png"
                                            alt=""
                                        />
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Button onClick={handleLogOut}>
                                        Log Out
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <span className="mr-5 hidden md:block">
                            {user.displayName}
                        </span>
                    </div>
                ) : (
                    <>
                        <Button
                            className="hidden md:block"
                            onClick={() => navigate("/login")}
                        >
                            Log In
                        </Button>
                        <Button
                            className="hidden md:block"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </Button>
                    </>
                )}

                <ThemeButton />
                <NavBarDropDown />
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild className="md:hidden">
                        <Button variant="outline" size="icon">
                            <Menu />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => navigate("/")}>
                            Home
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/blogs")}>
                            Blogs
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate("/blogs")}>
                            Feature Blogs
                        </DropdownMenuItem>

                        {user && (
                            <>
                                <DropdownMenuItem>
                                    <Button
                                        variant="ghost"
                                        onClick={() => navigate("/wishlist")}
                                    >
                                        Wishlist
                                    </Button>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button
                                        variant="ghost"
                                        onClick={() => navigate("/add-blog")}
                                    >
                                        Add Blog
                                    </Button>
                                </DropdownMenuItem>
                            </>
                        )}
                        <DropdownMenuItem>
                            {user ? (
                                <>
                                    <Button
                                        className=" md:hidden"
                                        onClick={handleLogOut}
                                    >
                                        Log Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        className=" md:hidden"
                                        onClick={() => navigate("/login")}
                                    >
                                        Log In
                                    </Button>
                                    <Button
                                        className=" md:hidden"
                                        onClick={() => navigate("/register")}
                                    >
                                        Register
                                    </Button>
                                </>
                            )}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}
            </div>
        </nav>
    );
};

export default NavBar;

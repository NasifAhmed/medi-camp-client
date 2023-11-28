import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { AuthContext } from "../providers/AuthProvider";
import { NavBarDropDown } from "./NavBarDropDown";
import { ThemeButton } from "./ThemeButton";
import { Button } from "./ui/button";
// import { useAxios } from "../hooks/useAxios";
import { routes } from "@/router/NavigationRoutes";

const NavBar = () => {
    // [dropDownState, setDropDownState] = useState([]);

    const { user, logOut } = useContext(AuthContext);
    // const axios = useAxios(true);
    const navigate = useNavigate();
    const handleLogOut = () => {
        // const userEmail = user?.email;
        logOut()
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
                    <AvatarImage src="https://i.ibb.co/NmRFDbN/logo.png" />
                </Avatar>
            </div>
            <div className="md:flex justify-between items-center gap-10 hidden text-xl font-semibold">
                {routes.map((data, index) => (
                    <div key={index}>
                        <NavLink
                            to={data.route}
                            className={"navbar transition-colors"}
                        >
                            {data.name}
                        </NavLink>
                    </div>
                ))}
            </div>
            <div className="flex flex-1 ml-auto justify-end items-center gap-1">
                {user ? (
                    <div className="flex text-xs md:text-base items-center">
                        <Avatar className="mr-2">
                            <AvatarImage
                                src={user.photoURL as string | undefined}
                            />
                            <AvatarFallback>
                                <img
                                    src="https://i.ibb.co/dWbbNfk/fallback.png"
                                    alt=""
                                />
                            </AvatarFallback>
                        </Avatar>

                        <span className="mr-5 hidden md:block">
                            {user.displayName}
                        </span>
                        <Button
                            className="hidden md:block"
                            onClick={handleLogOut}
                        >
                            Log Out
                        </Button>
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

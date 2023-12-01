import AnimationWrapper from "@/components/AnimationWrapper";
import Banner from "@/components/Banner";
import HomeCampCard from "@/components/HomeCampCard";
import Testimonials from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAxios } from "@/hooks/useAxios";
import { AuthContext } from "@/providers/AuthProvider";
import { Camp } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Home() {
    const { user } = useContext(AuthContext);
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Home | Medi Camp");
        AOS.init();
        // console.log(userFromDB);
    }, [setTitle, user]);

    const axios = useAxios();

    const queryResponse = useQuery({
        queryKey: ["camp", "home", "popular", "profile"],
        queryFn: async (): Promise<Camp[] | null> => {
            try {
                const res = await axios.get(`/camp?limit=6`);
                return res.data.sort(
                    (a: any, b: any) =>
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                );
            } catch (error) {
                console.log(`Error while fetching camp data : `, error);
                return null;
            }
        },
    });
    const navigate = useNavigate();

    return (
        <AnimationWrapper>
            <section className="banner">
                <Banner />
            </section>
            <Separator className="my-10" />
            <section className="popular flex flex-col items-center gap-4">
                <h1 className="text-center text-3xl font-bold mb-10">
                    Popular Camps
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3 ">
                    {queryResponse.data &&
                        queryResponse.data.map((data, index) => {
                            return <HomeCampCard key={index} campData={data} />;
                        })}
                </div>
                <Button onClick={() => navigate("/available-camps")}>
                    All Camps
                </Button>
            </section>
            <Separator className="my-10" />
            <h1 className="text-center text-3xl font-bold mb-10">
                Testimonials
            </h1>
            <section className="testimonials">
                <Testimonials />
            </section>
        </AnimationWrapper>
    );
}

export default Home;

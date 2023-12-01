// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "../assets/slider.css";

// import required modules
import { useAxios } from "@/hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

type countResult = {
    count: string;
};

export default function Banner() {
    const axios = useAxios();
    const doctorCountQuery = useQuery({
        queryKey: ["banner", "doctor", "count"],
        queryFn: async (): Promise<countResult | null> => {
            try {
                const response = await axios.get(`/user?role=doctor&count=0`);
                return response.data;
            } catch (error) {
                console.log(`Error getting doctor count data : ${error}`);
                return null;
            }
        },
    });

    const registeredCountQuery = useQuery({
        queryKey: ["banner", "registered", "count"],
        queryFn: async (): Promise<countResult | null> => {
            try {
                const response = await axios.get(`/registered?count=0`);
                // const fees = response.data.reduce((accum, current) => {
                //     if (current.payment_status) {
                //         return accum + current;
                //     }
                // });
                // return fees;
                return response.data;
            } catch (error) {
                console.log(`Error getting registered data : ${error}`);
                return null;
            }
        },
    });

    const campCountQuery = useQuery({
        queryKey: ["banner", "camps", "count"],
        queryFn: async (): Promise<countResult | null> => {
            try {
                const response = await axios.get(`/camp?count=0`);
                return response.data;
            } catch (error) {
                console.log(`Error getting camp count data : ${error}`);
                return null;
            }
        },
    });

    const organizerCountQuery = useQuery({
        queryKey: ["banner", "organizer", "count"],
        queryFn: async (): Promise<countResult | null> => {
            try {
                const response = await axios.get(
                    `/user?role=organizer&count=0`
                );
                // const fees = response.data.reduce((accum, current) => {
                //     if (current.payment_status) {
                //         return accum + current;
                //     }
                // });
                // return fees;
                return response.data;
            } catch (error) {
                console.log(`Error getting docotor data : ${error}`);
                return null;
            }
        },
    });

    return (
        <>
            <div className="relative">
                <Swiper
                    spaceBetween={30}
                    effect={"fade"}
                    // navigation={true}
                    // pagination={{
                    //     clickable: true,
                    // }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[EffectFade, Navigation, Pagination, Autoplay]}
                    className="mySwiper w-full h-[50vh]"
                >
                    <SwiperSlide>
                        <img
                            className="relative blur-sm object-cover object-center h-full md:w-full"
                            src="https://i.ibb.co/5k7b1RD/camp4.jpg"
                        />
                        <div className="absolute top-0 right-0 z-10 w-full h-full bg-black opacity-60 flex flex-col items-center md:items-end justify-center gap-5 font-bold text-white md:pr-60">
                            <h1 className="md:text-8xl text-6xl text-primary">
                                {campCountQuery.data?.count}
                            </h1>

                            <h1 className="md:text-3xl text-2xl">
                                Camps Organized
                            </h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            className="relative blur-sm object-cover object-center h-full md:w-full"
                            src="https://i.ibb.co/bmMZJvK/camp3.jpg"
                        />
                        <div className="absolute top-0 right-0 z-10 w-full h-full bg-black opacity-60 flex flex-col items-center md:items-end justify-center gap-5 font-bold text-white md:pr-60">
                            <h1 className="md:text-8xl text-6xl text-primary">
                                {organizerCountQuery.data?.count}
                            </h1>

                            <h1 className="md:text-3xl text-2xl">Organizers</h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            className="relative blur-sm object-cover object-center h-full md:w-full"
                            src="https://i.ibb.co/hMFDLML/camp1.jpg"
                        />
                        <div className="absolute top-0 right-0 z-10 w-full h-full bg-black opacity-60 flex flex-col items-center md:items-end justify-center gap-5 font-bold text-white md:pr-60">
                            <h1 className="md:text-8xl text-6xl text-primary">
                                {doctorCountQuery.data?.count}
                            </h1>

                            <h1 className="md:text-3xl text-2xl">
                                Healthcare Professionals
                            </h1>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img
                            className="relative blur-sm object-cover object-center h-full md:w-full"
                            src="https://i.ibb.co/zrLRqCr/camp2.jpg"
                        />
                        <div className="absolute top-0 right-0 z-10 w-full h-full bg-black opacity-60 flex flex-col items-center md:items-end justify-center gap-5 font-bold text-white md:pr-60">
                            <h1 className="md:text-8xl text-6xl text-primary">
                                {registeredCountQuery.data?.count}
                            </h1>

                            <h1 className="md:text-3xl text-2xl">
                                Registrations
                            </h1>
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className="absolute top-0 left-0 md:flex md:flex-col w-full h-full justify-center items-start pl-20 z-40 hidden">
                    <h1 className="text-5xl font-extrabold text-white">
                        Medi Camp
                    </h1>
                    <br />
                    <h2 className="text-white mt-4">
                        Empowering Health, Enriching Lives <br />
                        Your Partner in Organizing Transformative Medical Camps.
                    </h2>
                </div>
            </div>
        </>
    );
}

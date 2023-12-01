// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import TestimonialCard from "@/components/TestimonialCard";
import { useAxios } from "@/hooks/useAxios";
import { Feedback } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { Autoplay } from "swiper/modules";

export default function Testimonials() {
    const axios = useAxios();
    const feedbackResponse = useQuery({
        queryKey: ["feedback"],
        queryFn: async (): Promise<Feedback[] | null> => {
            try {
                const res = await axios.get("/feedback");
                return res.data;
            } catch (error) {
                console.log(`Error while fetching feedback data : ${error}`);
                return null;
            }
        },
    });

    return (
        <>
            {feedbackResponse.data && (
                <>
                    <Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        loop={true}
                        autoplay={{
                            delay: 1500,
                            disableOnInteraction: true,
                        }}
                        modules={[Autoplay]}
                        className="mySwiper"
                    >
                        {feedbackResponse.data.map((data) => {
                            return (
                                <SwiperSlide>
                                    <TestimonialCard data={data} />
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </>
            )}
        </>
    );
}

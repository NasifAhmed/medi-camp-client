import { useAxios } from "@/hooks/useAxios";
import { Camp } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CampCard from "../components/CampCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import AnimationWrapper from "@/components/AnimationWrapper";

function AvailableCamps() {
    // Set the title
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Available Camps | Medi Camp");
    }, [setTitle]);

    const axios = useAxios();

    const campResponse = useQuery({
        queryKey: ["camp"],
        queryFn: async (): Promise<Camp[] | null> => {
            try {
                const res = await axios.get("/camp");
                setData(res.data);
                return res.data;
            } catch (error) {
                console.log(`Error while fetching camp data : ${error}`);
                return null;
            }
        },
    });

    const [data, setData] = useState(campResponse.data);

    const searchHandler = (typedValue: string) => {
        const newData = campResponse.data?.filter((d) =>
            d?.name.toLowerCase().includes(typedValue.toLowerCase())
        );
        setData(newData);
    };

    const sortHandler = (selected: string) => {
        if (selected === "fees") {
            const newData = [...campResponse.data].sort(
                (a, b) => parseInt(a.fees) - parseInt(b.fees)
            );
            setData(newData);
            console.log("category test", newData);
            console.log("sorted test", data);
        } else if (selected === "date") {
            const newData = [...campResponse.data].sort(
                (a, b) =>
                    new Date(a.date).getTime() - new Date(b.date).getTime()
            );
            setData(newData);
            console.log("category test", newData);
            console.log("sorted test", data);
        }
    };

    const resetHandler = () => {
        setData(campResponse.data);
    };

    return (
        <AnimationWrapper>
            <div
                className="flex flex-col lg:flex-row gap-5 justify-between
                items-center mb-10"
            >
                <div className="flex flex-col lg:flex-row w-full max-w-sm justify-center items-center gap-2">
                    <Input
                        type="search"
                        placeholder="Search by camp name"
                        onChange={(e) => searchHandler(e.target.value)}
                    />
                    <Button type="submit" onClick={resetHandler}>
                        Reset
                    </Button>
                </div>
                <div className="flex flex-col lg:flex-row gap-2">
                    <Label className="text-xl font-semibold">Sort by :</Label>
                    <Select
                        onValueChange={(selectedValue) =>
                            sortHandler(selectedValue)
                        }
                        name="sort"
                    >
                        <SelectTrigger className="w-60 mr-2">
                            <SelectValue placeholder="Select One" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="fees">Fees</SelectItem>
                            <SelectItem value="date">Date</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button className="hidden lg:block" onClick={resetHandler}>
                        Reset
                    </Button>
                </div>
            </div>
            <Separator className="w-full mb-10" />
            <div className="camps-display flex flex-col justify-center items-center gap-5 md:mx-10 mx-1">
                {data &&
                    data.map((camp: Camp) => {
                        return <CampCard campData={camp} />;
                    })}
            </div>
        </AnimationWrapper>
    );
}

export default AvailableCamps;

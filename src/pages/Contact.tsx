import AnimationWrapper from "@/components/AnimationWrapper";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useOutletContext } from "react-router-dom";

function Contact() {
    const position: any = [23.780107006843398, 90.40757809263523];
    const setTitle: React.Dispatch<React.SetStateAction<string>> =
        useOutletContext();
    useEffect(() => {
        setTitle("Contact Us | Medi Camp");
    }, [setTitle]);
    return (
        <AnimationWrapper>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-4xl">
                        Contact Us
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <span className="text-lg font-semibold">Email : </span>
                    medicamp@medicamp.com
                </CardContent>
                <CardContent>
                    <span className="text-lg font-semibold">Phone : </span>
                    +123456789
                </CardContent>
                <CardContent>
                    <span className="text-lg font-semibold">Location : </span>
                    63, Mohakhali C/A, Bir Uttam AK Khandakar Road, Dhaka 1212
                </CardContent>
                <CardContent>
                    <MapContainer
                        center={position}
                        zoom={13}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </CardContent>
                <CardFooter className="text-center">
                    <p className="text-center">Thank you for staying with us</p>
                </CardFooter>
            </Card>
        </AnimationWrapper>
    );
}

export default Contact;

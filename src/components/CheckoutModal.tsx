import { useState } from "react";
import Stripe from "./Stripe";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { RegisteredParticipant } from "@/types/types";

function CheckoutModal({
    registerData,
}: {
    registerData: RegisteredParticipant;
}) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Pay</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Join</DialogTitle>
                    <DialogDescription>Fill the info to join</DialogDescription>
                </DialogHeader>
                <Stripe registerData={registerData} modalControl={setOpen} />
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default CheckoutModal;

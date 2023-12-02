import { Camp } from "@/types/types";
import { useState } from "react";
import JoinUpcomingCampForm from "./JoinUpcomingCampForm";
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

function JoinUpcomingCampModal({ campData }: { campData: Camp }) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Join Camp</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Join</DialogTitle>
                    <DialogDescription>Fill the info to join</DialogDescription>
                </DialogHeader>
                <JoinUpcomingCampForm
                    modalControl={setOpen}
                    campData={campData}
                />
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

export default JoinUpcomingCampModal;

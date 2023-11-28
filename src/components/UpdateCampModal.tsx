import { Camp } from "@/types/types";
import { useState } from "react";
import UpdateCampForm from "./UpdateCampForm";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

function UpdateCampModal({ campData }: { campData: Camp }) {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Update</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md lg:max-w-screen-lg overflow-y-scroll max-h-screen">
                <DialogHeader>
                    <DialogTitle>Update Camp</DialogTitle>
                </DialogHeader>
                <UpdateCampForm campData={campData} />
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

export default UpdateCampModal;

import { useState } from "react";
import UpdateProfileForm from "./UpdateProfileForm";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "./ui/dialog";

function UpdateProfileModal() {
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Update Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md lg:max-w-screen-lg overflow-y-scroll max-h-screen">
                <DialogHeader>
                    {/* <DialogTitle>Update Profile</DialogTitle> */}
                </DialogHeader>
                <UpdateProfileForm modalControl={setOpen} />
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

export default UpdateProfileModal;

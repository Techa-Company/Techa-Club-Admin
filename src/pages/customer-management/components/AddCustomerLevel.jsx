import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export function AddCustomerLevel() {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="px-5">افزودن سطح</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader >
                    <DialogTitle>افزودن سطح جدید</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 items-center gap-5">
                    <div className="grid flex-1 gap-2">
                        <Input placeholder="عنوان" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input type="number" placeholder="حداقل خرید" />
                    </div>
                    <div className="grid flex-1 gap-2">
                        <Input type="number" placeholder="حداکثر خرید" />
                    </div>
                </div>
                <div className="flex justify-end gap-5 mt-5">
                    <Button className="px-5" type="button">
                        ثبت
                    </Button>
                    <DialogClose asChild>
                        <Button className="px-5" type="button" variant="outline" >
                            بستن
                        </Button>
                    </DialogClose>
                </div>

            </DialogContent>
        </Dialog>
    )
}

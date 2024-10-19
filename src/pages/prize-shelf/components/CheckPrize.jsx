
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CheckPrize() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">برسی کد جایزه</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader >
                    <DialogTitle>برسی کد جایزه</DialogTitle>
                    <DialogDescription>
                        برای برسی از صحت کد جایزه آن را  وارد کنید.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input />
                    </div>
                    <Button type="button">
                        برسی
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}

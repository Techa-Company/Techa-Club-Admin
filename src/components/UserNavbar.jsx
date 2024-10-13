import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/custom/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from './button'

export function UserNavbar() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                    <Avatar className='h-10 w-10'>
                        <AvatarImage src='https://media.licdn.com/dms/image/v2/D4D35AQEEK8sJVUUeag/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1726985143395?e=1729418400&v=beta&t=qe1HVugJpEcg75arJ4ewCnSVmxmP1ncd9MPugUPYSxw' alt='@shadcn' />
                        <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>رامین جوشنگ</p>
                        <p className='text-xs leading-none text-muted-foreground'>
                            rjwshng@gmail.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        پروفایل
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        سبد خرید
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        تنظیمات
                    </DropdownMenuItem>
                    <DropdownMenuItem>منوی جدید</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    خروج
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

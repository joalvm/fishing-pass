import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import getInitials from '@/lib/get-initials.util';
import { PageProps } from '@/types/app.type';
import { usePage } from '@inertiajs/react';

export function UserInfo() {
    const {
        auth: { user, person },
    } = usePage<PageProps>().props;

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar_url || ''} alt={person.first_name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(person)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{`${person.first_name} ${person.last_name_paternal}`}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
        </>
    );
}

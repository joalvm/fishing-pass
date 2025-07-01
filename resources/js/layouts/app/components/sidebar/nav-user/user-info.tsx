import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/layouts/app/app.context';

export function UserInfo() {
    const { user, person, getInitials } = useApp();
    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage src={user.avatar_url || ''} alt={person.first_name} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{`${person.first_name} ${person.last_name_paternal}`}</span>
                <span className="truncate text-xs text-muted-foreground">{user.email}</span>
            </div>
        </>
    );
}

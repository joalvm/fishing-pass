import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import AuthType from '@/enums/auth-type.enum';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { useApp } from '@/layouts/app/app.context';
import { Link, router } from '@inertiajs/react';
import { LogOut, Settings } from 'lucide-react';
import { UserInfo } from './user-info';

export function UserMenuContent() {
    const { authType } = useApp();
    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const settingsRoute = authType === AuthType.CLIENT ? route('client.settings.index') : route('admin.settings.index');

    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo />
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link className="block w-full" href={settingsRoute} as="button" prefetch onClick={cleanup}>
                        <Settings className="mr-2" />
                        Configuraciones
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link className="block w-full" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut className="mr-2" />
                    Cerrar sesión
                </Link>
            </DropdownMenuItem>
        </>
    );
}

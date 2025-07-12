import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { type NavItem } from '@/types/app.type';
import { Link } from '@inertiajs/react';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user/nav-user';

interface AppSidebarProps {
    items: NavItem[];
}

export function AppSidebar({ items }: AppSidebarProps) {
    const { open } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch className="justify-center">
                                <img src="/logo.svg" alt="Express Pass Logo" className={cn('h-8', { hidden: !open })} />
                                <img src="/icon.svg" alt="Express Pass Logo" className={cn('h-5', { hidden: open })} />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="py-2">
                <NavMain items={items} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

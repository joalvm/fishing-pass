import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { NavItem, type BreadcrumbItem } from '@/types/app.type';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { AppProvider } from './app.context';
import { AppSidebarHeader } from './components/header/app-sidebar-header';
import { AppSidebar } from './components/sidebar/app-sidebar';

export interface AppLayoutProps extends PropsWithChildren {
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
    navigation: NavItem[];
}

export default function AppLayout({ children, navigation, title, breadcrumbs }: AppLayoutProps) {
    return (
        <AppProvider>
            {!!title && <Head title={title} />}
            <SidebarProvider className="h-full">
                <AppSidebar items={navigation} />
                <SidebarInset className="mx-auto flex w-full flex-1 flex-col">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </AppProvider>
    );
}

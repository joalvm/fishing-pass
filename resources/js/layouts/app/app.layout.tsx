import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { AppProvider } from './app.context';
import { AppSidebarHeader } from './components/header/app-sidebar-header';
import { AppSidebar } from './components/sidebar/app-sidebar';

export interface AppLayoutProps extends PropsWithChildren {
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, title, breadcrumbs }: AppLayoutProps) {
    return (
        <AppProvider>
            {!!title && <Head title={title} />}
            <SidebarProvider className="h-full">
                <AppSidebar />
                <SidebarInset className="mx-auto flex w-full flex-1 flex-col">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    <div className="flex h-full w-full p-6">{children}</div>
                </SidebarInset>
            </SidebarProvider>
        </AppProvider>
    );
}

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';
import { PropsWithChildren } from 'react';
import { AppProvider } from './app.context';
import { AppSidebarHeader } from './components/header/app-sidebar-header';
import { AppSidebar } from './components/sidebar/app-sidebar';

export interface AppLayoutProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <AppProvider>
            <SidebarProvider className="h-full">
                <AppSidebar />
                <SidebarInset className="mx-auto flex w-full flex-1 flex-col">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </SidebarInset>
            </SidebarProvider>
        </AppProvider>
    );
}

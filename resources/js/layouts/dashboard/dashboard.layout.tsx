import { SidebarProvider } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';
import { PropsWithChildren } from 'react';
import Content from './components/content.component';
import { AppSidebarHeader } from './components/header/app-sidebar-header';
import { AppSidebar } from './components/sidebar/app-sidebar';
import { DashboardProvider } from './dashboard.context';

interface DashboardProps extends PropsWithChildren {
    breadcrumbs?: BreadcrumbItem[];
}

export default function Dashboard({ children, breadcrumbs }: DashboardProps) {
    return (
        <DashboardProvider>
            <SidebarProvider>
                <AppSidebar />
                <main className="mx-auto flex h-full w-full flex-1 flex-col gap-4">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    <Content>{children}</Content>
                </main>
            </SidebarProvider>
        </DashboardProvider>
    );
}

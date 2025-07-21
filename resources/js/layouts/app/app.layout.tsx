import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/sonner';
import AuthType from '@/enums/auth-type.enum';
import { PageProps, type BreadcrumbItem } from '@/types/app.type';
import { Head, usePage } from '@inertiajs/react';
import { ShieldAlertIcon, ShieldCheckIcon, ShieldXIcon } from 'lucide-react';
import { PropsWithChildren, useEffect } from 'react';
import { toast } from 'sonner';
import adminNavigation from '../../pages/admin/navigation'; // Importing admin navigation for types
import clientNavigation from '../../pages/client/navigation'; // Importing client navigation for types
import { AppSidebarHeader } from './components/header/app-sidebar-header';
import { AppSidebar } from './components/sidebar/app-sidebar';

export interface AppLayoutProps extends PropsWithChildren {
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, title, breadcrumbs }: AppLayoutProps) {
    const {
        auth: { type: authType, user },
    } = usePage<PageProps>().props;

    useEffect(() => {
        const checkedMessage = !!sessionStorage.getItem('checkedMessage');
        if (user.email_verified_at === null && !checkedMessage) {
            toast.warning('¡Importante!', {
                position: 'top-center',
                description: 'Por favor, verifica tu dirección de correo electrónico para completar tu perfil.',
            });

            sessionStorage.setItem('checkedMessage', 'true');
        }
    }, []);

    return (
        <>
            {!!title && <Head title={title} />}
            <SidebarProvider className="h-full">
                <AppSidebar items={authType === AuthType.CLIENT ? clientNavigation : adminNavigation} />
                <SidebarInset className="mx-auto flex w-full flex-1 flex-col">
                    <AppSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                    {/* copyrigth */}
                    <div className="flex items-center justify-center py-2 text-xs text-muted-foreground/50">
                        &copy; {new Date().getFullYear()} Santa Monica Fishing. Todos los derechos reservados.
                    </div>
                </SidebarInset>
                <Toaster
                    closeButton
                    icons={{
                        error: <ShieldXIcon className="h-5 w-5 text-red-600" />,
                        success: <ShieldCheckIcon className="h-5 w-5 text-green-600" />,
                        warning: <ShieldAlertIcon className="h-5 w-5 text-orange-600" />,
                    }}
                />
            </SidebarProvider>
        </>
    );
}

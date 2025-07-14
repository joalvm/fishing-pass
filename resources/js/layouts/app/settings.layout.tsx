import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Heading from '@/layouts/app/components/heading.component';
import { Link } from '@inertiajs/react';
import AppLayout, { AppLayoutProps } from './app.layout';
import Content from './components/content.component';

const sideNavItems = [
    {
        title: 'Perfil',
        href: route(`settings.profile.edit`),
        icon: null,
    },
    {
        title: 'Contraseña',
        href: route(`settings.password.edit`),
        icon: null,
    },
    {
        title: 'Apariencia',
        href: route(`settings.appearance`),
        icon: null,
    },
];

export default function SettingsLayout({ children, ...props }: AppLayoutProps) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    const getPath = (href: string) => {
        const url = new URL(href, window.location.origin);
        return url.pathname;
    };

    return (
        <AppLayout {...props}>
            <Content size="lg" className="flex-1">
                <Heading title="Configuraciones" description="Administra tu perfil y la configuración de tu cuenta" />

                <div className="flex flex-col space-y-6">
                    {/* Tab de navegación */}
                    <Tabs defaultValue={currentPath} className="w-full">
                        <TabsList className="w-full space-x-2">
                            {sideNavItems.map((item, index) => (
                                <TabsTrigger value={getPath(item.href)} key={`${item.href}-${index}`} asChild className="w-full">
                                    <Link href={item.href} prefetch>
                                        {item.title}
                                    </Link>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <Separator className="my-4" />
                        {/* Contenido de la pestaña */}
                        <TabsContent value={currentPath} className="space-y-6">
                            {children}
                        </TabsContent>
                    </Tabs>
                </div>
            </Content>
        </AppLayout>
    );
}

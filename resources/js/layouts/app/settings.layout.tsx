import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import AuthType from '@/enums/auth-type.enum';
import Heading from '@/layouts/app/components/heading.component';
import { cn } from '@/lib/utils';
import { PageProps, type NavItem } from '@/types/app.type';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import AppLayout, { AppLayoutProps } from './app.layout';

function sideNavItems(authType: AuthType) {
    const prefix = authType === AuthType.CLIENT ? 'client' : 'admin';

    return [
        {
            title: 'Perfil',
            href: route(`${prefix}.settings.profile.edit`),
            icon: null,
        },
        {
            title: 'Contraseña',
            href: route(`${prefix}.settings.password.edit`),
            icon: null,
        },
        {
            title: 'Apariencia',
            href: route(`${prefix}.settings.appearance`),
            icon: null,
        },
    ] as NavItem[];
}

function Content({ children }: PropsWithChildren) {
    const {
        auth: { type: authType },
    } = usePage<PageProps>().props;

    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-4 py-6">
            <Heading title="Configuraciones" description="Administra tu perfil y la configuración de tu cuenta" />

            <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12">
                <aside className="w-full max-w-xl lg:w-48">
                    <nav className="flex flex-col space-y-1 space-x-0">
                        {sideNavItems(authType).map((item, index) => (
                            <Button
                                key={`${item.href}-${index}`}
                                size="sm"
                                variant="ghost"
                                asChild
                                className={cn('w-full justify-start', {
                                    'bg-muted': currentPath === item.href,
                                })}
                            >
                                {item.href ? (
                                    <Link href={item.href} prefetch>
                                        {item.title}
                                    </Link>
                                ) : (
                                    <span>{item.title}</span>
                                )}
                            </Button>
                        ))}
                    </nav>
                </aside>

                <Separator className="my-6 md:hidden" />

                <div className="flex-1 md:max-w-2xl">
                    <section className="max-w-xl space-y-12">{children}</section>
                </div>
            </div>
        </div>
    );
}

export default function SettingsLayout({ children, ...props }: AppLayoutProps) {
    return (
        <AppLayout {...props}>
            <Content>{children}</Content>
        </AppLayout>
    );
}

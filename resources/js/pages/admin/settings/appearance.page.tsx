import { Appearance, useAppearance } from '@/hooks/use-appearance';
import Heading from '@/layouts/app/components/heading.component';
import SettingsLayout from '@/layouts/app/settings.layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/types';
import { LucideIcon, MonitorIcon, MoonIcon, SunIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuración de apariencia',
        href: '#',
    },
];

export default function AppearancePage({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: SunIcon, label: 'Claro' },
        { value: 'dark', icon: MoonIcon, label: 'Oscuro' },
        { value: 'system', icon: MonitorIcon, label: 'Sistema' },
    ];

    return (
        <SettingsLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <Heading title="Configuración de apariencia" description="Actualiza la configuración de apariencia de tu cuenta" size="small" />
                <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
                    {tabs.map(({ value, icon: Icon, label }) => (
                        <button
                            key={value}
                            onClick={() => updateAppearance(value)}
                            className={cn(
                                'flex items-center rounded-md px-3.5 py-1.5 transition-colors',
                                appearance === value
                                    ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                    : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                            )}
                        >
                            <Icon className="-ml-1 h-4 w-4" />
                            <span className="ml-1.5 text-sm">{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </SettingsLayout>
    );
}

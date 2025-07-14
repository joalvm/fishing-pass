import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Appearance, useAppearance } from '@/hooks/use-appearance';
import Heading from '@/layouts/app/components/heading.component';
import SettingsLayout from '@/layouts/app/settings.layout';
import { BreadcrumbItem } from '@/types/app.type';
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
            <div className="flex flex-col gap-6 space-y-6">
                <Heading title="Configuración de apariencia" description="Actualiza la configuración de apariencia de tu cuenta" size="small" />
                <Tabs defaultValue={appearance}>
                    <TabsList className="space-x-2">
                        <TabsTrigger value="light" onClick={() => updateAppearance('light')}>
                            <SunIcon className="mr-2 h-4 w-4" />
                            Claro
                        </TabsTrigger>
                        <TabsTrigger value="dark" onClick={() => updateAppearance('dark')}>
                            <MoonIcon className="mr-2 h-4 w-4" />
                            Oscuro
                        </TabsTrigger>
                        <TabsTrigger value="system" onClick={() => updateAppearance('system')}>
                            <MonitorIcon className="mr-2 h-4 w-4" />
                            Sistema
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </SettingsLayout>
    );
}

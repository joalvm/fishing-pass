import Heading from '@/layouts/app/components/heading.component';
import SettingsLayout from '@/layouts/app/settings.layout';

const breadcrumbs = [
    {
        title: 'Cambiar contraseña',
        href: '#',
    },
];

export default function ProfilePage() {
    return (
        <SettingsLayout breadcrumbs={breadcrumbs}>
            <Heading title="Cambiar contraseña" description="Actualiza tu contraseña aquí." size="small" />
        </SettingsLayout>
    );
}

import Heading from '@/layouts/app/components/heading.component';
import SettingsLayout from '@/layouts/app/settings.layout';

const breadcrumbs = [
    {
        title: 'Configuración de perfil',
        href: '#',
    },
];

export default function ProfilePage() {
    return (
        <SettingsLayout breadcrumbs={breadcrumbs}>
            <Heading title="Configuración de perfil" description="Actualiza tu información de perfil aquí." size="small" />
        </SettingsLayout>
    );
}

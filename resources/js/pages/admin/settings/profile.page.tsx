import HeadingSmall from '@/components/heading-small';
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
            <HeadingSmall title="Configuración de perfil" description="Actualiza tu información de perfil aquí." />
        </SettingsLayout>
    );
}

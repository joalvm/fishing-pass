import HeadingSmall from '@/components/heading-small';
import SettingsLayout from '@/layouts/app/settings.layout';

const breadcrumbs = [
    {
        title: 'Cambiar contraseña',
        href: '#',
    },
];

export default function ProfilePage() {
    return (
        <SettingsLayout>
            <HeadingSmall title="Cambiar contraseña" description="Actualiza tu contraseña aquí." />
        </SettingsLayout>
    );
}

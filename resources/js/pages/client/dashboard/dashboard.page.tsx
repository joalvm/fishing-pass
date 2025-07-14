import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import ClientLayout from '../client.layout';

const breadcrumbs = [{ title: 'Panel de control', href: route('admin.dashboard') }];

export default function DashboardPage() {
    return (
        <ClientLayout breadcrumbs={breadcrumbs} title="Panel de control">
            <Content size="full">
                <Heading title="Panel de control" description="Resumen general de operaciones" />
            </Content>
        </ClientLayout>
    );
}

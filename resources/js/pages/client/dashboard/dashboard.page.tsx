import AppLayout from '@/layouts/app/app.layout';
import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';

const breadcrumbs = [{ title: 'Panel de control', href: route('admin.dashboard') }];

export default function DashboardPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs} title="Panel de control">
            <Content size="full">
                <Heading title="Panel de control" description="Resumen general de operaciones" />
            </Content>
        </AppLayout>
    );
}

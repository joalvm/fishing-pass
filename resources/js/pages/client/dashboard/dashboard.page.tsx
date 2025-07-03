import Heading from '@/layouts/app/components/heading.component';
import ClientLayout from '../client.layout';

const breadcrumbs = [{ title: 'Panel de control', href: route('admin.dashboard') }];

export default function DashboardPage() {
    return (
        <ClientLayout breadcrumbs={breadcrumbs} title="Panel de control">
            <div className="h-fullflex-1 flex w-full flex-col overflow-x-auto rounded-xl bg-background">
                <Heading title="Panel de control" description="Resumen general de operaciones" />
            </div>
        </ClientLayout>
    );
}

import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '../../admin.layout';
import Content from '@/layouts/app/components/content.component';

export default function CompaniesPage() {
    return (
        <AdminLayout title="Clientes">
            <Content size='lg'>
                <Heading title="Clientes" description="Lista de clientes registrados en el sistema." />
            </Content>
        </AdminLayout>
    );
}

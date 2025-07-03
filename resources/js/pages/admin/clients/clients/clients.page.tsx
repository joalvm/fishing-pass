import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '../../admin.layout';

export default function ClientsPage() {
    return (
        <AdminLayout title="Clientes">
            <Heading title="Clientes" description="Lista de clientes registrados en el sistema." />
        </AdminLayout>
    );
}

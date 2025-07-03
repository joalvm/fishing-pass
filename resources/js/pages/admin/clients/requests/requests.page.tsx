import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '../../admin.layout';

export default function RequestsPage() {
    return (
        <AdminLayout title="Solicitudes de registro">
            <Heading title="Solicitudes de registro" description="Lista de de cliente que solicitan pertenecer a la plataforma." />
        </AdminLayout>
    );
}

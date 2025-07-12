import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '../admin.layout';

export default function PersonsPage() {
    return (
        <AdminLayout title="Personal">
            <Content size="xxl">
                <Heading title="Personal" description="Lista de personal de la empresa." />
            </Content>
        </AdminLayout>
    );
}

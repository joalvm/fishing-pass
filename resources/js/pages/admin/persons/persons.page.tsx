import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '../admin.layout';
import PersonsPageProps from './types/persons-page.type';

export default function PersonsPage({ persons }: PersonsPageProps) {
    return (
        <AdminLayout title="Personal">
            <Content size="xxl">
                <Heading title="Personal" description="Lista de personal de la empresa." />
                <pre>{JSON.stringify(persons, null, 2)}</pre>
            </Content>
        </AdminLayout>
    );
}

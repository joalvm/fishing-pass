import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import { PageProps } from '@/types/app.type';
import AdminLayout from '../admin.layout';

type PersonsCreatePageProps = PageProps & {
    document_types: number[];
};

const breadcrumbs = (title: string) => [{ title: 'Personal', href: route('admin.persons.index') }, { title }];

export default function PersonsCreatePage({ document_types }: PersonsCreatePageProps) {
    return (
        <AdminLayout title="Personal" breadcrumbs={breadcrumbs('Crear Personal')}>
            <Content size="xxl">
                <Heading title="Crear Personal" description="Crea un nuevo registro de personal." />
            </Content>
        </AdminLayout>
    );
}

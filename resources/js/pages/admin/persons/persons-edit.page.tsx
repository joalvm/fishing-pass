import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import { PageProps } from '@/types/app.type';
import AdminLayout from '../admin.layout';
import Person from './types/person.type';

type PersonsEditPageProps = PageProps & {
    person: Person;
    document_types: number[];
};

const breadcrumbs = (title: string) => [{ title: 'Personal', href: route('admin.persons.index') }, { title }];

export default function PersonsEditPage({ person, document_types }: PersonsEditPageProps) {
    return (
        <AdminLayout title="Personal" breadcrumbs={breadcrumbs('Editar Personal')}>
            <Content size="xxl">
                <Heading title="Editar Personal" description="Modifica los datos del personal." />
            </Content>
        </AdminLayout>
    );
}

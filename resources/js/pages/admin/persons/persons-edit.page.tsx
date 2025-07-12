import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import { PageProps } from '@/types/app.type';
import type DocumentType from '@/types/document-type.type';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AdminLayout from '../admin.layout';
import PersonFormButtonSubmit from './components/form/person-form-button-submit.component';
import PersonForm from './components/form/person-form.component';
import { usePersonForm } from './hooks/use-person-form';
import Person from './types/person.type';

type PersonsEditPageProps = PageProps & {
    person: Person;
    document_types: DocumentType[];
};

const breadcrumbs = (title: string) => [{ title: 'Personal', href: route('admin.persons.index') }, { title }];

export default function PersonsEditPage({ person, document_types }: PersonsEditPageProps) {
    const { form } = usePersonForm({
        documentTypes: document_types,
        initialValues: {
            first_name: person.first_name,
            middle_name: person.middle_name || undefined,
            last_name_paternal: person.last_name_paternal,
            last_name_maternal: person.last_name_maternal || undefined,
            gender: person.gender,
            document_type_id: person.document_type.id,
            document_number: person.document_number,
            email: person.email || undefined,
            phone: person.phone || undefined,
        },
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('admin.persons.update', person.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Personal actualizado correctamente.');
            },
        });
    };

    return (
        <AdminLayout title="Personal" breadcrumbs={breadcrumbs(`${person.first_name} ${person.last_name_paternal}`)}>
            <Content size="lg">
                <Heading title="Editar Personal" description="Modifica los datos del personal." />
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                    <PersonForm form={form} documentTypes={document_types} />
                    <PersonFormButtonSubmit recentlySuccessful={form.recentlySuccessful} processing={form.processing} />
                </form>
            </Content>
        </AdminLayout>
    );
}

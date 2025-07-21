import AppLayout from '@/layouts/app/app.layout';
import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import { PageProps } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import StaffFormButtonSubmit from './components/form/staff-form-button-submit.component';
import StaffForm from './components/form/staff-form.component';
import { useStaffForm } from './hooks/use-staff-form';
import Person from './types/person.type';
import StaffPageProps from './types/staff-page.type';

const breadcrumbs = (title: string) => [{ title: 'Listado de personal', href: route('client.staff.index') }, { title }];

type StaffEditPageProps = PageProps & {
    person: Person;
    document_types: DocumentType[];
};

export default function StaffEditPage({ person, document_types }: StaffEditPageProps) {
    const { form } = useStaffForm({
        initialValues: {
            first_name: person.first_name,
            middle_name: person.middle_name || undefined,
            last_name_paternal: person.last_name_paternal,
            last_name_maternal: person.last_name_maternal || undefined,
            gender: person.gender,
            document_type_id: person.document_type.id,
            document_number: person.document_number,
            phone: person.phone || undefined,
        },
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('client.staff.update', person.id), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                const { status, message } = props?.flash as StaffPageProps['flash'];
                if (status === 'success') {
                    toast.success(message);
                } else {
                    toast.error('Error al actualizar el personal.', {
                        description: message,
                    });
                }
            },
            onError: (errors) => {
                toast.error('Error al actualizar el personal.', {
                    description: Object.values(errors)
                        .flat()
                        .map((error) => `- ${error}`)
                        .map((error) => <div key={error}>{error}</div>),
                });
            },
        });
    };

    return (
        <AppLayout title="Editar personal" breadcrumbs={breadcrumbs(`${person.first_name} ${person.last_name_paternal}`)}>
            <Content size="lg">
                <Heading title="Editar Personal" description="Modifica los datos del personal." />
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                    <StaffForm form={form} documentTypes={document_types} />
                    <StaffFormButtonSubmit recentlySuccessful={form.recentlySuccessful} processing={form.processing} />
                </form>
            </Content>
        </AppLayout>
    );
}

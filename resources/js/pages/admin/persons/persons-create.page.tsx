import PersonGender from '@/enums/person-gender.enum';
import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import { PageProps } from '@/types/app.type';
import type DocumentType from '@/types/document-type.type';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import AdminLayout from '../admin.layout';
import PersonFormButtonSubmit from './components/form/person-form-button-submit.component';
import PersonForm from './components/form/person-form.component';
import PersonUserForm from './components/form/person-user-form.component';
import { usePersonForm } from './hooks/use-person-form';

type PersonsCreatePageProps = PageProps & {
    document_types: DocumentType[];
};

const breadcrumbs = (title: string) => [{ title: 'Personal', href: route('admin.persons.index') }, { title }];

export default function PersonsCreatePage({ document_types, errors }: PersonsCreatePageProps) {
    const { form, withUser, setWithUser, resetAll } = usePersonForm({
        documentTypes: document_types,
        initialValues: {
            first_name: '',
            middle_name: undefined,
            last_name_paternal: '',
            last_name_maternal: undefined,
            gender: PersonGender.FEMALE,
            document_type_id: 1,
            document_number: '',
            email: undefined,
            phone: undefined,
            user: undefined,
        },
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log('Submitting form with data:', form.data);

        form.post(route('admin.persons.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Personal creado correctamente.');
                resetAll();
            },
        });
    };

    return (
        <AdminLayout title="Personal" breadcrumbs={breadcrumbs('Crear Personal')}>
            <Content size="lg">
                <Heading title="Crear Personal" description="Crea un nuevo registro de personal." />
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                    <PersonForm form={form} documentTypes={document_types} />
                    <PersonUserForm withUser={withUser} setWithUser={setWithUser} form={form} />
                    <PersonFormButtonSubmit recentlySuccessful={form.recentlySuccessful} processing={form.processing} />
                </form>
            </Content>
        </AdminLayout>
    );
}

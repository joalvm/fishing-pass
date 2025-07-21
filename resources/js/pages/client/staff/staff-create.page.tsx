import PersonGender from '@/enums/person-gender.enum';
import AppLayout from '@/layouts/app/app.layout';
import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import { PageProps } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import StaffFormButtonSubmit from './components/form/staff-form-button-submit.component';
import StaffForm from './components/form/staff-form.component';
import StaffUserForm from './components/form/staff-user-form.component';
import { useStaffForm } from './hooks/use-staff-form';
import StaffPageProps from './types/staff-page.type';

type StaffCreatePageProps = PageProps & {
    document_types: DocumentType[];
};

const breadcrumbs = [{ title: 'Listado de personal', href: route('client.staff.index') }, { title: 'Crear nuevo personal' }];

export default function StaffCreatePage({ document_types }: StaffCreatePageProps) {
    const { form, withUser, setWithUser, resetAll } = useStaffForm({
        initialValues: {
            first_name: '',
            middle_name: undefined,
            last_name_paternal: '',
            last_name_maternal: undefined,
            gender: PersonGender.MALE,
            document_type_id: 1,
            document_number: '',
            phone: undefined,
            user: undefined,
        },
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('client.staff.store'), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                const { status, message } = props?.flash as StaffPageProps['flash'];
                if (status === 'success') {
                    toast.success(message);
                    resetAll();
                } else {
                    toast.error('Error al crear el personal.', {
                        description: message,
                    });
                }
            },
            onError: (errors) => {
                toast.error('Error al crear el personal.', {
                    description: Object.values(errors)
                        .flat()
                        .map((error) => `- ${error}`)
                        .map((error) => <div key={error}>{error}</div>),
                });
            },
        });
    };

    return (
        <AppLayout title="Crear nuevo personal" breadcrumbs={breadcrumbs}>
            <Content size="lg">
                <Heading title="Crear Personal" description="Crea un nuevo registro de personal." />
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                    <StaffForm form={form} documentTypes={document_types} />
                    <StaffUserForm withUser={withUser} setWithUser={setWithUser} form={form} />
                    <StaffFormButtonSubmit recentlySuccessful={form.recentlySuccessful} processing={form.processing} />
                </form>
            </Content>
        </AppLayout>
    );
}

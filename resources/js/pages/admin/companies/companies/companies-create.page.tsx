import { Toaster } from '@/components/ui/sonner';
import CompanyEntityType from '@/enums/company-entity-type';
import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '@/pages/admin/admin.layout';
import { PageProps } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';
import CompanyFormButtonSubmit from './components/form/company-form-button-submit.component';
import { CompanyForm } from './components/form/company-form.component';
import CompanyUserForm from './components/form/company-user-form.component';
import CompanyFormValues from './types/company-form-values.type';

const breadcrumbs = (businessName: string) => [{ title: 'Empresas', href: route('admin.companies.index') }, { title: businessName }];

type CompaniesCreatePageProps = PageProps & {
    document_types: DocumentType[];
};

export default function CompaniesCreatePage({ document_types, errors }: CompaniesCreatePageProps) {
    const [withUser, setWithUser] = useState(false);

    const form = useForm<CompanyFormValues>({
        entity_type: CompanyEntityType.JURIDICAL_PERSON,
        document_type_id: 3,
        document_number: '',
        business_name: '',
        email: '',
        address: '',
        phone: undefined,
        user: withUser
            ? {
                  first_name: 'Administrador',
                  last_name: 'Empresa',
                  email: '',
                  password: '',
                  notify: false,
              }
            : undefined,
    });

    useEffect(() => {
        form.setData('user.email' as keyof CompanyFormValues, form.data.email);
    }, [form.data.email]); // eslint-disable-line react-hooks/exhaustive-deps

    console.log(errors);

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        console.log('Submitting form with data:', form.data);

        form.post(route('admin.companies.store'), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Empresa creada correctamente.');
                form.reset();
                setWithUser(false);
            },
        });
    };

    return (
        <AdminLayout title="Crear Empresa" breadcrumbs={breadcrumbs('Crear Empresa')}>
            <Content size="lg">
                <Heading title="Crear Empresa" description="Crear una nueva empresa." />
                <Toaster />
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                    <CompanyForm form={form} documentTypes={document_types} />
                    <CompanyUserForm withUser={withUser} form={form} setWithUser={setWithUser} />
                    <CompanyFormButtonSubmit recentlySuccessful={form.recentlySuccessful} processing={form.processing} />
                </form>
            </Content>
        </AdminLayout>
    );
}

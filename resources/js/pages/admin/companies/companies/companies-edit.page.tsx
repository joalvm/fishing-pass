import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '@/pages/admin/admin.layout';
import { PageProps } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';
import CompanyFormButtonSubmit from './components/form/company-form-button-submit.component';
import { CompanyForm } from './components/form/company-form.component';
import Company from './types/companies.type';
import CompanyFormValues from './types/company-form-values.type';

const breadcrumbs = (businessName: string) => [{ title: 'Empresas', href: route('admin.companies.index') }, { title: businessName }];

type CompaniesEditPageProps = PageProps & {
    company: Company;
    document_types: DocumentType[];
};

export default function CompaniesEditPage({ company, document_types }: CompaniesEditPageProps) {
    const form = useForm<CompanyFormValues>({
        entity_type: company.entity_type,
        document_type_id: company.document_type.id,
        document_number: company.document_number,
        business_name: company.business_name,
        email: company.email,
        address: company.address,
        phone: company.phone,
    });

    /**
     * Handler para el envío del formulario
     *
     * @param data Datos del formulario
     */
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('admin.companies.update', company.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('Empresa actualizada correctamente.');
            },
        });
    };

    return (
        <AdminLayout title="Editar Empresa" breadcrumbs={breadcrumbs(company.business_name)}>
            <Content size="lg">
                <Heading title="Editar Empresa" description="Editar datos de la empresa." />
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                    <CompanyForm form={form} documentTypes={document_types} />
                    <CompanyFormButtonSubmit recentlySuccessful={form.recentlySuccessful} processing={form.processing} />
                </form>
            </Content>
        </AdminLayout>
    );
}

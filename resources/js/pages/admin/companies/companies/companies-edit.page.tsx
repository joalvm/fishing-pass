import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '@/pages/admin/admin.layout';
import { PageProps } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';
import { router } from '@inertiajs/react';
import { CompanyForm } from './components/company-form.component';
import Company from './types/companies.type';
import CompanyFormValues from './types/company-form-values.type';

const breadcrumbs = (businessName: string) => [{ title: 'Empresas', href: route('admin.companies.index') }, { title: businessName }];

type CompaniesEditPageProps = PageProps & {
    company: Company;
    document_types: DocumentType[];
};

export default function CompaniesEditPage({ company, document_types }: CompaniesEditPageProps) {
    const initialData = {
        business_name: company.business_name,
        document_type_id: company.document_type.id,
        document_number: company.document_number,
        entity_type: company.entity_type,
        email: company.email,
        address: company.address,
        phone: company.phone,
    };

    /**
     * Handler para el envío del formulario
     *
     * @param data Datos del formulario
     */
    const handleSubmit = (data: CompanyFormValues) => {
        router.put(route('admin.companies.update', company.id), data);
    };

    return (
        <AdminLayout title="Editar Empresa" breadcrumbs={breadcrumbs(company.business_name)}>
            <Content size="lg">
                <Heading title="Editar Empresa" description="Editar datos de la empresa." />
                <CompanyForm mode="edit" initialData={initialData} documentTypes={document_types} onSubmit={handleSubmit} />
            </Content>
        </AdminLayout>
    );
}

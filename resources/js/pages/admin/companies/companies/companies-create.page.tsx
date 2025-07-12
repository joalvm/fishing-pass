import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '@/pages/admin/admin.layout';
import { PageProps } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';
import { router } from '@inertiajs/react';
import { CompanyForm } from './components/company-form.component';
import CompanyFormValues from './types/company-form-values.type';

const breadcrumbs = (businessName: string) => [{ title: 'Empresas', href: route('admin.companies.index') }, { title: businessName }];

type CompaniesCreatePageProps = PageProps & {
    document_types: DocumentType[];
};

export default function CompaniesCreatePage({ document_types }: CompaniesCreatePageProps) {
    const handleSubmit = (data: CompanyFormValues) => {
        router.post(route('admin.companies.store'), data);
    };
    return (
        <AdminLayout title="Crear Empresa" breadcrumbs={breadcrumbs('Crear Empresa')}>
            <Content size="lg">
                <Heading title="Crear Empresa" description="Crear una nueva empresa." />
                <CompanyForm mode="create" documentTypes={document_types} onSubmit={handleSubmit} />
            </Content>
        </AdminLayout>
    );
}

import Content from '@/layouts/app/components/content.component';
import AdminLayout from '@/pages/admin/admin.layout';
import { PageProps } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';

const breadcrumbs = (businessName: string) => [{ title: 'Empresas', href: route('admin.companies.index') }, { title: businessName }];

type CompaniesCreatePageProps = PageProps & {
    document_types: DocumentType[];
};

export default function CompaniesCreatePage({ document_types }: CompaniesCreatePageProps) {
    return (
        <AdminLayout title="Crear Empresa" breadcrumbs={breadcrumbs('Crear Empresa')}>
            <Content size="lg">
                <pre>{JSON.stringify(document_types, null, 2)}</pre>
            </Content>
        </AdminLayout>
    );
}

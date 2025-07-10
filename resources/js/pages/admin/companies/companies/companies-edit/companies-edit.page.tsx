import Content from '@/layouts/app/components/content.component';
import AdminLayout from '@/pages/admin/admin.layout';
import { PageProps } from '@/types/app.type';
import Company from '../types/companies.type';

const breadcrumbs = (businessName: string) => [{ title: 'Empresas', href: route('admin.companies.index') }, { title: businessName }];

type CompaniesEditPageProps = PageProps & {
    company: Company;
};

export default function CompaniesEditPage({ company }: CompaniesEditPageProps) {
    return (
        <AdminLayout title="Editar Empresa" breadcrumbs={breadcrumbs(company.business_name)}>
            <Content size="lg">
                <pre>{JSON.stringify(company, null, 2)}</pre>
            </Content>
        </AdminLayout>
    );
}

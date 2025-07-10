import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '../../admin.layout';

import CompaniesPageProps from './types/companies-page.type';

const breadcrumbs = [{ title: 'Clientes', href: route('admin.companies.index') }];

export default function CompaniesPage({ companies }: CompaniesPageProps) {
    return (
        <AdminLayout title="Clientes" breadcrumbs={breadcrumbs}>
            <Content size="lg">
                <Heading title="Clientes" description="Lista de clientes registrados en el sistema." />
                <pre>{JSON.stringify(companies, null, 2)}</pre>
            </Content>
        </AdminLayout>
    );
}

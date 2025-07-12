import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '../../admin.layout';
import DeleteConfirmationDialog from './components/delete-confirmation-dialog.component';
import { Filters } from './components/filters/filters.component';
import StatsCards from './components/stats-cards.component';
import CompaniesTable from './components/table/companies-table.component';
import { CompaniesProvider } from './contexts/companies.context';
import CompaniesPageProps from './types/companies-page.type';

const breadcrumbs = [{ title: 'Clientes', href: route('admin.companies.index') }];

// Datos fake para las tarjetas de estadísticas
const fakeStats = {
    total: 32,
    active: 25,
    inactive: 7,
    registeredViaForm: 12,
};

export default function CompaniesPage({ companies, filters, document_types }: CompaniesPageProps) {
    return (
        <AdminLayout title="Clientes" breadcrumbs={breadcrumbs}>
            <CompaniesProvider companies={companies} initialFilters={filters}>
                <Content size="xxl">
                    <Heading title="Clientes" description="Lista de clientes registrados en el sistema." />
                    <StatsCards {...fakeStats} />
                    <div>
                        <Filters documentTypes={document_types} />
                        <CompaniesTable />
                        <DeleteConfirmationDialog />
                    </div>
                </Content>
            </CompaniesProvider>
        </AdminLayout>
    );
}

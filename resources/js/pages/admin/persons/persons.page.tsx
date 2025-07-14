import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import AdminLayout from '../admin.layout';
import DeleteConfirmationDialog from './components/delete-confirmation-dialog.component';
import { Filters } from './components/filters/filters.component';
import PersonsTable from './components/table/persons-table.component';
import { PersonsProvider } from './contexts/persons.context';
import PersonsPageProps from './types/persons-page.type';

const breadcrumbs = [{ title: 'Personal', href: route('admin.persons.index') }];

export default function PersonsPage({ persons, filters, document_types }: PersonsPageProps) {
    return (
        <AdminLayout title="Personal" breadcrumbs={breadcrumbs}>
            <PersonsProvider persons={persons} initialFilters={filters}>
                <Content size="xxl">
                    <Heading title="Personal" description="Lista de personal de la empresa." />
                    <div className="flex flex-col gap-4">
                        <Filters documentTypes={document_types} />
                        <PersonsTable />
                        <DeleteConfirmationDialog />
                    </div>
                </Content>
            </PersonsProvider>
        </AdminLayout>
    );
}

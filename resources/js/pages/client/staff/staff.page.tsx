import AppLayout from '@/layouts/app/app.layout';
import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import { StaffFilters } from './components/filters/staff-filters.component';
import StaffTable from './components/table/staff-table.component';
import { StaffPageProvider } from './staff-page.context';
import StaffPageProps from './types/staff-page.type';

export default function StaffPage({ persons, document_types, filters }: StaffPageProps) {
    return (
        <AppLayout title="Personal de la empresa">
            <StaffPageProvider persons={persons} initialFilters={filters}>
                <Content size="xxl">
                    <Heading title="Personal" description="Lista de personal de la empresa." />
                    <div className="flex flex-col gap-4">
                        <StaffFilters documentTypes={document_types} />
                        <StaffTable />
                    </div>
                </Content>
            </StaffPageProvider>
        </AppLayout>
    );
}

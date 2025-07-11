import Content from '@/layouts/app/components/content.component';
import { Filter, PageProps, Paginate } from '@/types/app.type';
import { Toaster } from 'sonner';
import AdminLayout from '../../admin.layout';
import ApprovalDialog from './components/approval-dialog.component';
import DeleteConfirmationDialog from './components/delete-confirmation-dialog.component';
import { Filters } from './components/filters.component';
import RejectionDialog from './components/rejection-dialog.component';
import ApprovedRequests from './components/stats/approved-requests';
import PendingRequests from './components/stats/pending-requests';
import RejectedRequests from './components/stats/rejected-requests';
import TotalRequests from './components/stats/total-requests';
import RequestsTable from './components/table/request-table.component';
import { RequestsProvider } from './contexts/requests.context';
import RegistrationRequest from './types/registration-request.type';
import Stats from './types/stats.type';

interface RegistrationRequestsPageProps extends PageProps {
    requests: Paginate<RegistrationRequest>;
    stats: Stats;
    filters: Filter<RegistrationRequest>;
}

const breadcrumbs = [{ title: 'Solicitudes de registro' }];

export default function RegistrationRequestsPage({ requests, stats, filters }: RegistrationRequestsPageProps) {
    return (
        <AdminLayout title="Solicitudes de registro" breadcrumbs={breadcrumbs}>
            <RequestsProvider initialRequests={requests} initialFilters={filters}>
                <Content size="xxl">
                    {/* stats */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <TotalRequests stats={stats} />
                        <PendingRequests stats={stats} />
                        <ApprovedRequests stats={stats} />
                        <RejectedRequests stats={stats} />
                    </div>
                    {/* table */}
                    <div>
                        <Toaster />
                        <Filters />
                        <RequestsTable />
                        <RejectionDialog />
                        <ApprovalDialog />
                        <DeleteConfirmationDialog />
                    </div>
                </Content>
            </RequestsProvider>
        </AdminLayout>
    );
}

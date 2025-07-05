import CompanyEntityType from '@/enums/company-entity-type';
import RegistrationStatus from '@/enums/registration-status.enum';
import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import { Filter, PageProps, Paginate } from '@/types/app.type';
import AdminLayout from '../../admin.layout';

interface RegistrationRequest {
    id: number;
    business_name: string;
    entity_type: CompanyEntityType;
    document_number: string;
    address: string;
    phone: string | null;
    email: string | null;
    status: RegistrationStatus;
    approved_at: string | null;
    approved_by: string | null;
    rejected_reason: string | null;
    document_type: {
        id: number;
        name: string;
        abbr: string;
    };
    created_at: string;
    updated_at: string;
}

type RegistrationRequestFilters = Filter<RegistrationRequest> & {
    statuses?: RegistrationStatus[];
};

interface RegistrationRequestsPageProps extends PageProps {
    filters: RegistrationRequestFilters;
    requests: Paginate<RegistrationRequest>;
}

const breadcrumbs = [{ title: 'Solicitudes de registro' }];

export default function RegistrationRequestsPage(props: RegistrationRequestsPageProps) {
    return (
        <AdminLayout title="Solicitudes de registro" breadcrumbs={breadcrumbs}>
            <Content size="lg">
                <Heading title="Solicitudes de registro" description="Lista de de cliente que solicitan pertenecer a la plataforma." />
                <pre className="rounded-lg bg-gray-100 p-4">
                    <code className="text-sm">{JSON.stringify(props.filters, null, 2)}</code>
                </pre>
            </Content>
        </AdminLayout>
    );
}

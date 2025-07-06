import CompanyEntityType from '@/enums/company-entity-type';
import RegistrationStatus from '@/enums/registration-status.enum';
import Content from '@/layouts/app/components/content.component';
import Heading from '@/layouts/app/components/heading.component';
import { Filter, PageProps, Paginate } from '@/types/app.type';
import AdminLayout from '../../admin.layout';
import TotalRequests from './components/stats/total-requests';
import Stats from './types/stats.type';
import RegistrationRequest from './types/registration-request.type';
import PendingRequests from './components/stats/pending-requests';
import ApprovedRequests from './components/stats/approved-requests';
import RejectedRequests from './components/stats/rejected-requests';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


type RegistrationRequestFilters = Filter<RegistrationRequest> & {
    statuses?: RegistrationStatus[];
};

interface RegistrationRequestsPageProps extends PageProps {
    filters: RegistrationRequestFilters;
    requests: Paginate<RegistrationRequest>;
    stats: Stats;
}

const breadcrumbs = [{ title: 'Solicitudes de registro' }];

export default function RegistrationRequestsPage(props: RegistrationRequestsPageProps) {
    const statuses = [RegistrationStatus.PENDING, RegistrationStatus.APPROVED, RegistrationStatus.REJECTED];
    const [filters, setFilters] = useState<string>(props.filters.contains?.text || '');
    const [status, setStatus] = useState<string[]>(props.filters.statuses || []);

    return (
        <AdminLayout title="Solicitudes de registro" breadcrumbs={breadcrumbs}>
            <Content size="lg">
                <Heading title="Solicitudes de registro" description="Lista de de cliente que solicitan pertenecer a la plataforma." />
                {/* Aqui los cards de estadisticas */}
                <div className="flex flex-row gap-6">
                    <TotalRequests stats={props.stats} />
                    <PendingRequests stats={props.stats} />
                    <ApprovedRequests stats={props.stats} />
                    <RejectedRequests stats={props.stats} />
                </div>
                {/* Aqui la tabla junto a sus input de busqueda, select de filtro de status y paginación. */}
                <div className="flex flex-col gap-6">
                    {/* Barra de busqueda y select de filtro por status */}
                    <div className="flex flex-row gap-6">

                    </div>
                    {/* Tabla */}
                    <div className="flex flex-col gap-6">

                    </div>
                    {/* Paginación */}
                    <div className="flex flex-row justify-end">

                    </div>
                </div>
            </Content>
        </AdminLayout>
    );
}

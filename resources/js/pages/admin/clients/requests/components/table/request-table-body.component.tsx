import { TableBody as ShadcnTableBody, TableCell, TableRow } from '@/components/ui/table';
import CompanyEntityType from '@/enums/company-entity-type';
import { ComponentProps } from 'react';
import { useRequests } from '../../contexts/requests.context';
import RegistrationRequest from '../../types/registration-request.type';
import BadgeStatus from './badge-status.component';

const entityTypeLabel = (entityType: CompanyEntityType) => {
    switch (entityType) {
        case CompanyEntityType.JURIDICAL_PERSON:
            return 'Persona Jurídica';
        case CompanyEntityType.NATURAL_PERSON:
            return 'Persona Natural';
        default:
            return 'Desconocido';
    }
};

type TableBodyRowProps = ComponentProps<typeof TableRow> & {
    row?: RegistrationRequest;
};

function TableBodyRow({ row }: TableBodyRowProps) {
    console.log(row);
    if (row === undefined) {
        return (
            <TableRow className='h-10 border-b-white hover:bg-transparent'>
                <TableCell colSpan={7} className="h-10"></TableCell>
            </TableRow>
        );
    }

    return (
        <TableRow>
            <TableCell className="text-center">
                <BadgeStatus status={row.status} />
            </TableCell>
            <TableCell className="font-medium">{row.business_name}</TableCell>
            <TableCell>{row.document_number}</TableCell>
            <TableCell>{entityTypeLabel(row.entity_type)}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell className="text-center">{new Date(row.created_at).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">{/* Actions Dropdown */}</TableCell>
        </TableRow>
    );
}

export default function TableBody() {
    const { requests, pagination } = useRequests();
    const remainingRows = pagination.perPage - requests.data.length;

    return (
        <ShadcnTableBody>
            {requests.data.length > 0 && requests.data.map((request) => <TableBodyRow key={request.id} row={request} />)}
            {remainingRows > 0 && Array.from({ length: remainingRows }, (_, i) => <TableBodyRow key={i} className="border-white" />)}
            {requests.data.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} className="h-[400px] text-center">
                        No hay resultados.
                    </TableCell>
                </TableRow>
            )}
        </ShadcnTableBody>
    );
}

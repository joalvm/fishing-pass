import { TableBody as ShadcnTableBody, TableCell, TableRow } from '@/components/ui/table';
import CompanyEntityType from '@/enums/company-entity-type';
import { ComponentProps, useState } from 'react';
import { useRequests } from '../../contexts/requests.context';
import RegistrationRequest from '../../types/registration-request.type';
import BadgeStatus from './badge-status.component';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { router } from '@inertiajs/react';
import { CheckIcon, MoreHorizontalIcon, Trash2Icon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import RejectionDialog from './rejection-dialog.component';

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
    const [rejectionTarget, setRejectionTarget] = useState<RegistrationRequest | null>(null);

    if (row === undefined) {
        return (
            <TableRow className='h-10 border-b-white hover:bg-transparent'>
                <TableCell colSpan={8} className="h-10"></TableCell>
            </TableRow>
        );
    }

    return (
        <>
            <RejectionDialog request={rejectionTarget} onClose={() => setRejectionTarget(null)} />
            <TableRow>
                <TableCell className="text-center">
                    <BadgeStatus status={row.status} />
                </TableCell>
                <TableCell className="font-medium">{row.business_name}</TableCell>
                <TableCell>{row.document_number}</TableCell>
                <TableCell>{entityTypeLabel(row.entity_type)}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell className="text-center">{new Date(row.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menú</span>
                                <MoreHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <CheckIcon className="mr-1 h-4 w-4" />
                                <span>Aprobar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setRejectionTarget(row)}>
                                <XIcon className="mr-1 h-4 w-4" />
                                <span>Rechazar</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                                <Trash2Icon className="mr-1 h-4 w-4 text-red-600" />
                                <span>Eliminar</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </TableCell>
            </TableRow>
        </>
    );
}

export default function TableBody() {
    const { requests, pagination } = useRequests();
    const remainingRows = pagination.perPage - requests.data.length;

    return (
        <ShadcnTableBody>
            {requests.data.length > 0 &&
                requests.data.map((request) => <TableBodyRow key={request.id} row={request} />)}
            {remainingRows > 0 &&
                Array.from({ length: remainingRows }, (_, i) => <TableBodyRow key={`empty-${i}`} />)}
            {requests.data.length === 0 && (
                <TableRow>
                    <TableCell colSpan={8} className="h-[400px] text-center">
                        No hay resultados.
                    </TableCell>
                </TableRow>
            )}
        </ShadcnTableBody>
    );
}

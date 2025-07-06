import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import CompanyEntityType from '@/enums/company-entity-type';
import { useRequests } from '../contexts/requests.context';
import BadgeStatus from './badge-status.component';
import { SettingsIcon } from 'lucide-react';

export function RequestsTable() {
    const { requests } = useRequests();

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

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Razón Social</TableHead>
                        <TableHead>N° Documento</TableHead>
                        <TableHead>Tipo de Entidad</TableHead>
                        <TableHead>Correo Electrónico</TableHead>
                        <TableHead className="text-center">Estado</TableHead>
                        <TableHead className="text-center">Fecha de Solicitud</TableHead>
                        <TableHead className="text-right">
                            <SettingsIcon className="h-4 w-4" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {requests.data.length > 0 ? (
                        requests.data.map((request) => (
                            <TableRow key={request.id}>
                                <TableCell className="font-medium">{request.business_name}</TableCell>
                                <TableCell>{request.document_number}</TableCell>
                                <TableCell>{entityTypeLabel(request.entity_type)}</TableCell>
                                <TableCell>{request.email}</TableCell>
                                <TableCell className="text-center">
                                    <BadgeStatus status={request.status} />
                                </TableCell>
                                <TableCell className="text-center">
                                    {new Date(request.created_at).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">{/* Actions Dropdown */}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No hay resultados.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}

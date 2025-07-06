import { TableHeader as ShadcnTableHeader, TableHead, TableRow } from '@/components/ui/table';
import { SettingsIcon } from 'lucide-react';

export default function TableHeader() {
    return (
        <ShadcnTableHeader>
            <TableRow>
                <TableHead className="w-[120px] text-center">Estado</TableHead>
                <TableHead>Razón Social</TableHead>
                <TableHead>N° Documento</TableHead>
                <TableHead>Tipo de Entidad</TableHead>
                <TableHead>Correo Electrónico</TableHead>
                <TableHead className="text-center">Fecha de Solicitud</TableHead>
                <TableHead className="text-right">
                    <SettingsIcon className="h-4 w-4" />
                </TableHead>
            </TableRow>
        </ShadcnTableHeader>
    );
}

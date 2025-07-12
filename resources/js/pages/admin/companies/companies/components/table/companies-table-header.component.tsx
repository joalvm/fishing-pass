import { TableHeader as ShadcnTableHeader, TableHead, TableRow } from '@/components/ui/table';
import { SettingsIcon } from 'lucide-react';

export default function CompaniesTableHeader() {
    return (
        <ShadcnTableHeader>
            <TableRow>
                <TableHead className="font-semibold">Tipo de Entidad</TableHead>
                <TableHead className="font-semibold">Razón Social</TableHead>
                <TableHead className="font-semibold">Documento</TableHead>
                <TableHead className="font-semibold">N° Documento</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Telefono</TableHead>
                <TableHead className="text-center font-semibold">
                    <span className="flex items-center justify-center">
                        <SettingsIcon className="h-4 w-4" />
                    </span>
                </TableHead>
            </TableRow>
        </ShadcnTableHeader>
    );
}

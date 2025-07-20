import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { SettingsIcon } from 'lucide-react';

export default function StaffTableHeader() {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="font-semibold">Nombre</TableHead>
                <TableHead className="font-semibold">Apellido paterno</TableHead>
                <TableHead className="font-semibold">Apellido materno</TableHead>
                <TableHead className="font-semibold">Género</TableHead>
                <TableHead className="font-semibold">Tipo doc.</TableHead>
                <TableHead className="font-semibold">N° doc.</TableHead>
                <TableHead className="font-semibold">Teléfono</TableHead>
                <TableHead className="text-center font-semibold">
                    <span className="flex items-center justify-center">
                        <SettingsIcon className="h-4 w-4" />
                    </span>
                </TableHead>
            </TableRow>
        </TableHeader>
    );
}

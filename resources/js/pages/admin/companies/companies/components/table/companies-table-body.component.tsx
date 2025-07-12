import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableBody as ShadcnTableBody, TableCell, TableRow } from '@/components/ui/table';
import { entityTypeLabel } from '@/enums/company-entity-type';
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useCompanies } from '../../contexts/companies.context';

export default function CompaniesTableBody() {
    const { companies, openDeleteDialog } = useCompanies();

    if (!companies.data.length) {
        return (
            <ShadcnTableBody>
                <TableRow>
                    <TableCell colSpan={8} className="py-6 text-center text-muted-foreground">
                        No hay empresas para mostrar.
                    </TableCell>
                </TableRow>
            </ShadcnTableBody>
        );
    }

    return (
        <ShadcnTableBody>
            {companies.data.map((company) => (
                <TableRow key={company.id} className="transition-colors hover:bg-muted/50">
                    <TableCell>
                        <Badge variant="outline">{entityTypeLabel(company.entity_type)}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                        {/* Pequeño circulo que marca el estado de la empresa */}
                        {company.enabled ? (
                            <Badge variant="outline" className="mr-2 h-1.5 w-1.5 border-0 bg-green-500 p-0"></Badge>
                        ) : (
                            <Badge variant="destructive" className="mr-2 h-1.5 w-1.5 border-0 bg-gray-500 p-0"></Badge>
                        )}
                        {company.business_name}
                    </TableCell>
                    <TableCell>{company.document_type.abbr}</TableCell>
                    <TableCell>{company.document_number}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.phone}</TableCell>
                    <TableCell className="text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menú</span>
                                    <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => (window.location.href = route('admin.companies.edit', company.id))}>
                                    <PencilIcon className="mr-2 h-4 w-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openDeleteDialog(company)} className="text-destructive focus:text-destructive">
                                    <Trash2Icon className="mr-2 h-4 w-4" /> Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </ShadcnTableBody>
    );
}

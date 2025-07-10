import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    TableBody as ShadcnTableBody,
    TableFooter as ShadcnTableFooter,
    TableHeader as ShadcnTableHeader,
    Table,
    TableCell,
    TableHead,
    TableRow,
} from '@/components/ui/table';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon, MoreHorizontalIcon, Trash2Icon } from 'lucide-react';
import { useCompanies } from '../contexts/companies.context';

function StatusBadge({ enabled }: { enabled: boolean }) {
    return enabled ? (
        <Badge variant="default" className="bg-green-50 text-[0.65rem] text-green-500">
            Activa
        </Badge>
    ) : (
        <Badge variant="destructive" className="bg-gray-50 text-[0.65rem] text-gray-500">
            Inactiva
        </Badge>
    );
}

function CompaniesTableHeader() {
    return (
        <ShadcnTableHeader>
            <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Razón Social</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>N° Documento</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Estado</TableHead>
                <TableHead className="text-center">
                    <span className="flex items-center justify-center">
                        <MoreHorizontalIcon className="h-4 w-4" />
                    </span>
                </TableHead>
            </TableRow>
        </ShadcnTableHeader>
    );
}

function CompaniesTableBody() {
    const { companies, openDeleteDialog } = useCompanies();
    if (!companies.data.length) {
        return (
            <ShadcnTableBody>
                <TableRow>
                    <TableCell colSpan={7} className="py-6 text-center text-muted-foreground">
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
                    <TableCell>{company.id}</TableCell>
                    <TableCell className="font-medium">{company.business_name}</TableCell>
                    <TableCell>{company.entity_type}</TableCell>
                    <TableCell>{company.document_number}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell className="text-center">
                        <StatusBadge enabled={company.enabled} />
                    </TableCell>
                    <TableCell className="text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menú</span>
                                    <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive focus:bg-destructive/10" onClick={() => openDeleteDialog(company)}>
                                    <Trash2Icon className="mr-2 h-4 w-4 text-destructive" /> Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </ShadcnTableBody>
    );
}

function CompaniesTableFooter() {
    const { companies, handleSetPage, handleSetPerPage } = useCompanies();
    const { current_page, last_page, per_page } = companies.meta;
    const remainingRows = per_page - companies.data.length;
    const options = remainingRows > 0 ? [10] : [10, 25, 50, 100];

    const canGoPrevious = current_page > 1;
    const canGoNext = current_page < last_page;

    return (
        <ShadcnTableFooter>
            <TableRow>
                <TableCell colSpan={7} className="py-3">
                    <div className="flex items-center justify-end space-x-6 lg:space-x-8">
                        {/* Página actual */}
                        <div className="flex items-center justify-center text-sm font-medium">
                            {current_page} / {last_page} <p className="ml-2 hidden text-sm font-medium sm:block"> páginas</p>
                        </div>
                        {/* Filas por página */}
                        <div className="flex items-center space-x-2">
                            <Select value={`${per_page}`} onValueChange={(value) => handleSetPerPage(Number(value))}>
                                <SelectTrigger className="h-8">
                                    <SelectValue placeholder={`${per_page}`} />
                                </SelectTrigger>
                                <SelectContent side="top">
                                    {options.map((pageSize) => (
                                        <SelectItem key={pageSize} value={`${pageSize}`}>
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <p className="hidden text-sm font-medium sm:block">Filas</p>
                        </div>

                        {/* Botones de paginación */}
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => handleSetPage(1)}
                                disabled={!canGoPrevious}
                            >
                                <span className="sr-only">Ir a la primera página</span>
                                <ChevronsLeftIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="h-8 w-8 p-0"
                                onClick={() => handleSetPage(current_page - 1)}
                                disabled={!canGoPrevious}
                            >
                                <span className="sr-only">Ir a la página anterior</span>
                                <ChevronLeftIcon className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" className="h-8 w-8 p-0" onClick={() => handleSetPage(current_page + 1)} disabled={!canGoNext}>
                                <span className="sr-only">Ir a la página siguiente</span>
                                <ChevronRightIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                className="hidden h-8 w-8 p-0 lg:flex"
                                onClick={() => handleSetPage(last_page)}
                                disabled={!canGoNext}
                            >
                                <span className="sr-only">Ir a la última página</span>
                                <ChevronsRightIcon className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </ShadcnTableFooter>
    );
}

export default function CompaniesTable() {
    return (
        <div className="rounded-md border">
            <Table>
                <CompaniesTableHeader />
                <CompaniesTableBody />
                <CompaniesTableFooter />
            </Table>
        </div>
    );
}

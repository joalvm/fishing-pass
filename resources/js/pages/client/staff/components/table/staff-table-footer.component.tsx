import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TableFooter as ShadcnTableFooter, TableCell, TableRow } from '@/components/ui/table';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react';
import { useStaffPage } from '../../staff-page.context';

export default function StaffTableFooter() {
    const { persons, handleSetPage, handleSetPerPage } = useStaffPage();
    const { current_page, last_page, per_page } = persons.meta;
    const remainingRows = per_page - persons.data.length;
    const options = remainingRows > 0 ? [10] : [10, 25, 50, 100];

    const canGoPrevious = current_page > 1;
    const canGoNext = current_page < last_page;

    return (
        <ShadcnTableFooter>
            <TableRow>
                <TableCell colSpan={8} className="py-3">
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

import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRequests } from '../contexts/requests.context';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export function Pagination() {
    const { requests, setPage, setPerPage } = useRequests();
    const { current_page, last_page, per_page } = requests.meta;

    const canGoPrevious = current_page > 1;
    const canGoNext = current_page < last_page;

    return (
        <div className="flex items-center px-2 py-4 justify-end text-gray-700">
            <div className="flex items-center space-x-6 lg:space-x-8 ">
                {/* Página actual */}
                <div className="flex items-center justify-center text-sm font-medium">
                    {current_page} / {last_page} {' '} <p className="hidden text-sm font-medium sm:block ml-2"> páginas</p>
                </div>
                {/* Filas por página */}
                <div className="flex items-center space-x-2">
                    <Select
                        value={`${per_page}`}
                        onValueChange={value => setPerPage(Number(value))}
                    >
                        <SelectTrigger className="h-8">
                            <SelectValue placeholder={`${per_page}`} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 25, 50, 100].map(pageSize => (
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
                        onClick={() => setPage(1)}
                        disabled={!canGoPrevious}
                    >
                        <span className="sr-only">Ir a la primera página</span>
                        <ChevronsLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setPage(current_page - 1)}
                        disabled={!canGoPrevious}
                    >
                        <span className="sr-only">Ir a la página anterior</span>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setPage(current_page + 1)}
                        disabled={!canGoNext}
                    >
                        <span className="sr-only">Ir a la página siguiente</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => setPage(last_page)}
                        disabled={!canGoNext}
                    >
                        <span className="sr-only">Ir a la última página</span>
                        <ChevronsRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

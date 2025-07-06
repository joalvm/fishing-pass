import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRequests } from '../contexts/requests.context';

export function Pagination() {
    const { requests, pagination, setPage, setPerPage } = useRequests();
    const { current_page, last_page, per_page } = requests.meta;

    const canGoPrevious = current_page > 1;
    const canGoNext = current_page < last_page;

    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                Página {current_page} de {last_page}
            </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium">Filas por página</p>
                    <Select
                        value={`${per_page}`}
                        onValueChange={value => setPerPage(Number(value))}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={per_page} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10, 25, 50, 100].map(pageSize => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(current_page - 1)}
                        disabled={!canGoPrevious}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(current_page + 1)}
                        disabled={!canGoNext}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
}

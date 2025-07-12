import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ListFilterIcon, ListFilterPlusIcon } from 'lucide-react';
import { useCompanies } from '../../contexts/companies.context';

export default function EnabledFilter() {
    const { enabled, handleSetEnabled } = useCompanies();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shadow-none">
                    {enabled ? <ListFilterIcon className="mr-1 h-4 w-4" /> : <ListFilterPlusIcon className="mr-1 h-4 w-4" />}
                    Estado
                    {enabled !== null && (
                        <Badge variant="default" className="text-[0.65rem]">
                            {enabled ? 'Activo' : 'Inactivo'}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuCheckboxItem checked={enabled === true} onCheckedChange={() => handleSetEnabled(enabled === true ? null : true)}>
                    Activo
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={enabled === false} onCheckedChange={() => handleSetEnabled(enabled === false ? null : false)}>
                    Inactivo
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

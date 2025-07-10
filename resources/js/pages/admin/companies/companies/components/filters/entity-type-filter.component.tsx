import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import CompanyEntityType, { entityTypeLabel } from '@/enums/company-entity-type';
import { ListFilterIcon, ListFilterPlusIcon } from 'lucide-react';
import { useCompanies } from '../../contexts/companies.context';

export default function EntityTypeFilter() {
    const { entityType, handleSetEntityType } = useCompanies();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shadow-none">
                    {entityType ? <ListFilterIcon className="mr-1 h-4 w-4" /> : <ListFilterPlusIcon className="mr-1 h-4 w-4" />}
                    Tipo de entidad
                    {entityType && (
                        <Badge variant="default" className="text-[0.65rem]">
                            {entityTypeLabel(entityType)}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex items-center">
                    <ListFilterIcon className="mr-2 h-4 w-4" />
                    Filtrar por tipo
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.values(CompanyEntityType).map((type) => (
                    <DropdownMenuCheckboxItem
                        key={type}
                        checked={entityType === type}
                        onCheckedChange={() => handleSetEntityType(entityType === type ? null : type)}
                    >
                        {entityTypeLabel(type)}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

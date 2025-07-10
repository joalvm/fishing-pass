import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ListFilterIcon } from 'lucide-react';

import CompanyEntityType from '@/enums/company-entity-type';
import DocumentType from '@/types/document-type.type';
import { useCompanies } from '../contexts/companies.context';

interface FiltersProps {
    documentTypes: DocumentType[];
}

export function Filters({ documentTypes }: FiltersProps) {
    const {
        searchTerm,
        handleSetSearchTerm,
        documentTypes: documentTypesFilter,
        handleSetDocumentTypes,
        entityType,
        handleSetEntityType,
        enabled,
        handleSetEnabled,
    } = useCompanies();

    return (
        <div className="flex items-center gap-4 py-4">
            <Input
                type="search"
                placeholder="Buscar por nombre de empresa..."
                value={searchTerm}
                onChange={(e) => handleSetSearchTerm(e.target.value)}
                className="max-w-sm shadow-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <ListFilterIcon className="mr-1 h-4 w-4" />
                        Tipo de entidad
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
                            {type}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            {/* Tipo de documento */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <ListFilterIcon className="mr-1 h-4 w-4" />
                        Tipo de documento
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="flex items-center">
                        <ListFilterIcon className="mr-2 h-4 w-4" />
                        Filtrar por documento
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {(documentTypes || []).map((dt) => (
                        <DropdownMenuCheckboxItem
                            key={dt.id}
                            checked={documentTypesFilter?.includes(dt.id) || false}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    handleSetDocumentTypes([...documentTypesFilter, dt.id]);
                                } else {
                                    handleSetDocumentTypes(documentTypesFilter.filter((id) => id !== dt.id));
                                }
                            }}
                        >
                            {dt.name}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <ListFilterIcon className="mr-1 h-4 w-4" />
                        Estado
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="flex items-center">
                        <ListFilterIcon className="mr-2 h-4 w-4" />
                        Filtrar por estado
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked={enabled === true} onCheckedChange={() => handleSetEnabled(enabled === true ? null : true)}>
                        Activo
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem checked={enabled === false} onCheckedChange={() => handleSetEnabled(enabled === false ? null : false)}>
                        Inactivo
                    </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

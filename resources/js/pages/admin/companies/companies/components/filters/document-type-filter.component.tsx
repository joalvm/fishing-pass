import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import DocumentType from '@/types/document-type.type';
import { ListFilterIcon } from 'lucide-react';
import { useCompanies } from '../../contexts/companies.context';

interface DocumentTypeFilterProps {
    documentTypes: DocumentType[];
}

export default function DocumentTypeFilter({ documentTypes }: DocumentTypeFilterProps) {
    const { documentTypes: documentTypesFilter, handleSetDocumentTypes } = useCompanies();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shadow-none">
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
    );
}

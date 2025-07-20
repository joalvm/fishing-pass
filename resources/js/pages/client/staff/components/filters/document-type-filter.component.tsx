import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import DocumentType from '@/types/document-type.type';
import { ListFilterIcon, ListFilterPlusIcon } from 'lucide-react';
import { useStaffPage } from '../../staff-page.context';

interface DocumentTypeFilterProps {
    documentTypes: DocumentType[];
}

export default function DocumentTypeFilter({ documentTypes }: DocumentTypeFilterProps) {
    const { documentTypes: documentTypesFilter, handleSetDocumentTypes } = useStaffPage();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="shadow-none">
                    {documentTypesFilter?.length ? <ListFilterIcon className="mr-1 h-4 w-4" /> : <ListFilterPlusIcon className="mr-1 h-4 w-4" />}
                    Tipo de documento
                    {documentTypesFilter?.length > 0 && (
                        <Badge variant="default" className="text-[0.65rem]">
                            {documentTypesFilter.length}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {(documentTypes || []).map((dt) => (
                    <DropdownMenuCheckboxItem
                        key={dt.id}
                        checked={documentTypesFilter?.includes(dt.id.toString()) || false}
                        onCheckedChange={(checked) => {
                            if (checked) {
                                handleSetDocumentTypes([...documentTypesFilter, dt.id.toString()]);
                            } else {
                                handleSetDocumentTypes(documentTypesFilter.filter((id) => id !== dt.id.toString()));
                            }
                        }}
                    >
                        {dt.abbr}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

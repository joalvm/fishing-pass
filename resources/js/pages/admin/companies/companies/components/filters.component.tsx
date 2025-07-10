import DocumentType from '@/types/document-type.type';
import DocumentTypeFilter from './filters/document-type-filter.component';
import EnabledFilter from './filters/enabled-filter.component';
import EntityTypeFilter from './filters/entity-type-filter.component';
import SearchFilter from './filters/search-filter.component';

interface FiltersProps {
    documentTypes: DocumentType[];
}

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

export function Filters({ documentTypes }: FiltersProps) {
    return (
        <div className="flex w-full flex-col flex-wrap gap-4 py-4 md:flex-row md:items-center md:justify-between">
            {/* Segmento 1 y 2: Barra de búsqueda + filtros */}
            <div className="flex grow flex-wrap items-center gap-2">
                <SearchFilter />
                <EntityTypeFilter />
                <DocumentTypeFilter documentTypes={documentTypes} />
                <EnabledFilter />
            </div>
            {/* Segmento 3: Botón crear empresa */}
            <div className="flex justify-end">
                <Button type="button" variant="outline" className="shadow-none">
                    <PlusIcon className="mr-1 h-4 w-4" />
                    Nuevo
                </Button>
            </div>
        </div>
    );
}

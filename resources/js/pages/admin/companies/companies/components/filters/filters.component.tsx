import DocumentType from '@/types/document-type.type';
import DocumentTypeFilter from './document-type-filter.component';
import EnabledFilter from './enabled-filter.component';
import EntityTypeFilter from './entity-type-filter.component';
import SearchFilter from './search-filter.component';

import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';

interface FiltersProps {
    documentTypes: DocumentType[];
}

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
                <Button type="button" variant="outline" asChild className="shadow-none">
                    <Link href={route('admin.companies.create')}>
                        <PlusIcon className="mr-1 h-4 w-4" />
                        Nuevo
                    </Link>
                </Button>
            </div>
        </div>
    );
}

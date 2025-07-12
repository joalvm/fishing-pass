import { Button } from '@/components/ui/button';
import DocumentType from '@/types/document-type.type';
import { Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import DocumentTypeFilter from './document-type-filter.component';
import GenderFilter from './gender-filter.component';
import SearchFilter from './search-filter.component';

interface FiltersProps {
    documentTypes: DocumentType[];
}

export function Filters({ documentTypes }: FiltersProps) {
    return (
        <div className="flex w-full flex-col flex-wrap gap-4 py-4 md:flex-row md:items-center md:justify-between">
            <div className="flex grow flex-wrap items-center gap-2">
                <SearchFilter />
                <GenderFilter />
                <DocumentTypeFilter documentTypes={documentTypes} />
            </div>
            <div className="flex justify-end">
                <Button type="button" variant="outline" asChild className="shadow-none">
                    <Link href={route('admin.persons.create')}>
                        <PlusIcon className="mr-1 h-4 w-4" />
                        Nuevo
                    </Link>
                </Button>
            </div>
        </div>
    );
}

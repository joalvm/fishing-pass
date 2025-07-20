import { Button } from '@/components/ui/button';
import DocumentType from '@/types/document-type.type';
import { Link } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import DocumentTypeFilter from './document-type-filter.component';
import SearchFilter from './search-filter.component';

interface StaffFiltersProps {
    documentTypes: DocumentType[];
}

export function StaffFilters({ documentTypes }: StaffFiltersProps) {
    return (
        <div className="flex w-full flex-col flex-wrap gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex grow flex-wrap items-center gap-2">
                <SearchFilter />
                <DocumentTypeFilter documentTypes={documentTypes} />
            </div>
            <div className="flex justify-end">
                <Button type="button" variant="default" asChild className="shadow-none">
                    <Link href={route('admin.persons.create')}>
                        <PlusIcon className="mr-1 h-4 w-4" />
                        Agregar
                    </Link>
                </Button>
            </div>
        </div>
    );
}

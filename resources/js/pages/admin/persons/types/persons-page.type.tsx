import { PageProps, Paginate } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';
import Person from './person.type';
import PersonsPageFilters from './persons-page-filters.type';

export default interface PersonsPageProps extends PageProps {
    persons: Paginate<Person>;
    document_types: DocumentType[];
    filters: PersonsPageFilters;
}

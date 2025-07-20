import { PageProps, Paginate } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';
import Person from './person.type';
import StaffPageFilters from './staff-page-filters.type';

export default interface StaffPageProps extends PageProps {
    persons: Paginate<Person>;
    document_types: DocumentType[];
    filters: StaffPageFilters;
}

import { PageProps, Paginate } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';
import CompaniesPageFilters from './companies-page-filters.type';
import Company from './companies.type';

type CompaniesPageProps = PageProps & {
    companies: Paginate<Company>;
    document_types: DocumentType[];
    filters: CompaniesPageFilters;
};

export default CompaniesPageProps;

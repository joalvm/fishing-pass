import { PageProps, Paginate } from '@/types/app.type';
import CompaniesPageFilters from './companies-page-filters.type';
import Company from './companies.type';

type CompaniesPageProps = PageProps & {
    companies: Paginate<Company>;
    filters: CompaniesPageFilters;
};

export default CompaniesPageProps;

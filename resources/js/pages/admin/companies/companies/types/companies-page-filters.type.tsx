import CompanyEntityType from '@/enums/company-entity-type';
import { Filter } from '@/types/app.type';
import Company from './companies.type';

type CompaniesPageFilters = Filter<Company> &
    Partial<{
        document_types: number[];
        entity_type: CompanyEntityType;
        enabled: boolean;
        registered_via_form: boolean;
    }>;

export default CompaniesPageFilters;

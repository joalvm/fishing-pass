import CompanyEntityType from '@/enums/company-entity-type';

export type CompanyUserFormValues = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    notify: boolean;
};

type CompanyFormValues = {
    business_name: string;
    document_type_id: number | '';
    document_number: string;
    entity_type: CompanyEntityType;
    email: string;
    address: string;
    phone?: string | null;
    user?: CompanyUserFormValues;
};

export default CompanyFormValues;

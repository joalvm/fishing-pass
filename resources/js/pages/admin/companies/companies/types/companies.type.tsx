import CompanyEntityType from '@/enums/company-entity-type';

type Company = {
    id: number;
    business_name: string;
    entity_type: CompanyEntityType;
    document_number: string;
    address: string;
    phone: string | null;
    email: string;
    document_type: {
        id: number;
        name: string;
        abbr: string;
    };
    enabled: boolean;
    registration_request_id: number | null;
    created_at: string;
    updated_at: string;
};

export default Company;

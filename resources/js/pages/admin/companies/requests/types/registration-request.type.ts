import CompanyEntityType from '@/enums/company-entity-type';
import RegistrationStatus from '../enums/registration-status.enum';

type RegistrationRequest = {
    id: number;
    business_name: string;
    entity_type: CompanyEntityType;
    document_number: string;
    address: string;
    phone: string | null;
    email: string | null;
    status: RegistrationStatus;
    approved_at: string | null;
    approved_by: string | null;
    rejected_reason: string | null;
    document_type: {
        id: number;
        name: string;
        abbr: string;
    };
    created_at: string;
    updated_at: string;
};

export default RegistrationRequest;

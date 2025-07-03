import AuthType from '@/enums/auth-type.enum';
import CompanyEntityType from '@/enums/company-entity-type';
import PersonGender from '@/enums/person-gender.enum';

export interface Auth {
    type: AuthType;
    user: User;
    person: Person;
    company: Company | null;
}

export interface User {
    id: number;
    email: string;
    avatar_url: string | null;
    is_super_admin: boolean;
    enabled: boolean;
    email_verified_at: string | null;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Person {
    id:number;
    document_type_id: number;
    document_number: string;
    first_name: string;
    middle_name: string | null;
    last_name_paternal: string;
    last_name_maternal: string | null;
    gender: PersonGender;
    email: string | null;
    phone: string | null;
}

export interface Company {
    id: number;
    entity_type: CompanyEntityType;
    business_name: string;
    document_type_id: number;
    document_number: string;
    email: string;
    address: string;
    phone: string | null;
}

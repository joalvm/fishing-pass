import { LucideIcon } from 'lucide-react';

export interface Auth {
    type: 'internal' | 'client';
    user: User;
    person: Person;
    company: Company | null;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    auth: Auth;
    [key: string]: unknown;
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
    gender: 'MALE' | 'FEMALE';
    email: string | null;
    phone: string | null;
}

export interface Company {
    id: number;
    entity_type: 'JURIDICAL_PERSON' | 'NATURAL_PERSON';
    business_name: string;
    document_type_id: number;
    document_number: string;
    email: string;
    address: string;
    phone: string | null;
}

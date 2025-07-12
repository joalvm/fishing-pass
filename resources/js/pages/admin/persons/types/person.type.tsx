import DocumentType from '@/types/document-type.type';

interface Person {
    id: string;
    first_name: string;
    middle_name: string;
    last_name_paternal: string;
    last_name_maternal: string;
    gender: string;
    email: string;
    phone: string;
    document_number: string;
    document_type: DocumentType;
    created_at: string;
    updated_at: string;
}

export default Person;

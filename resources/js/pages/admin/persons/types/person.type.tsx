import PersonGender from '@/enums/person-gender.enum';
import DocumentType from '@/types/document-type.type';

interface Person {
    id: string;
    first_name: string;
    middle_name: string | null;
    last_name_paternal: string;
    last_name_maternal: string | null;
    gender: PersonGender;
    email: string | null;
    phone: string | null;
    document_number: string;
    with_user: boolean;
    document_type: DocumentType;
    created_at: string;
    updated_at: string;
}

export default Person;

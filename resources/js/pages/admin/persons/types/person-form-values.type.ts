import PersonGender from '@/enums/person-gender.enum';

export type PersonUserFormValues = {
    email: string;
    password: string;
    notify: boolean;
};

type PersonFormValues = {
    first_name: string;
    middle_name?: string;
    last_name_paternal: string;
    last_name_maternal?: string;
    gender: PersonGender;
    document_type_id: number;
    document_number: string;
    email?: string;
    phone?: string;
    user?: PersonUserFormValues;
};

export default PersonFormValues;

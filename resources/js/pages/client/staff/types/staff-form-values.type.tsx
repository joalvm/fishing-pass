import PersonGender from '@/enums/person-gender.enum';

export type StaffUserFormValues = {
    email: string;
    password: string;
};

type StaffFormValues = {
    first_name: string;
    middle_name?: string;
    last_name_paternal: string;
    last_name_maternal?: string;
    gender: PersonGender;
    document_type_id: number;
    document_number: string;
    phone?: string;
    user?: StaffUserFormValues;
};

export default StaffFormValues;

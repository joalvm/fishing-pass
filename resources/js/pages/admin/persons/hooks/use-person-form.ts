import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type PersonFormValues from '../types/person-form-values.type';

interface UsePersonFormOptions {
    initialValues?: Partial<PersonFormValues>;
    documentTypes: { id: number }[];
}

export function usePersonForm({ initialValues = {}, documentTypes }: UsePersonFormOptions) {
    const [withUser, setWithUser] = useState(Boolean(initialValues.user));

    const form = useForm<PersonFormValues>({
        first_name: '',
        middle_name: '',
        last_name_paternal: '',
        last_name_maternal: '',
        gender: null,
        document_type_id: documentTypes[0]?.id ?? '',
        document_number: '',
        email: '',
        phone: '',
        user: undefined,
        ...initialValues,
    });

    // Sincronizar email de usuario con email de persona
    useEffect(() => {
        if (withUser) {
            form.setData('user', {
                ...form.data.user,
                email: form.data.email,
                password: form.data.user?.password || '',
                notify: form.data.user?.notify || false,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.data.email, withUser]);

    // Limpiar datos de usuario si se desactiva el switch
    useEffect(() => {
        if (!withUser) {
            form.setData('user', undefined);
        } else if (!form.data.user) {
            form.setData('user', {
                email: form.data.email,
                password: '',
                notify: false,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [withUser]);

    // Resetear el formulario y el switch
    const resetAll = () => {
        form.reset();
        setWithUser(false);
    };

    return { form, withUser, setWithUser, resetAll };
}

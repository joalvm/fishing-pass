import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import StaffFormValues from '../types/staff-form-values.type';

interface UseStaffFormOptions {
    initialValues: StaffFormValues;
}

export function useStaffForm({ initialValues }: UseStaffFormOptions) {
    const [withUser, setWithUser] = useState(Boolean(initialValues.user));

    const form = useForm<StaffFormValues>(initialValues);

    // Limpiar datos de usuario si se desactiva el switch
    useEffect(() => {
        if (!withUser) {
            form.setData('user', undefined);
        } else if (!form.data.user) {
            form.setData('user', { email: '', password: '' });
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

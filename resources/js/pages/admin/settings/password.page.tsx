import InputError from '@/components/input-error';
import InputPassword from '@/components/input-password';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Heading from '@/layouts/app/components/heading.component';
import SettingsLayout from '@/layouts/app/settings.layout';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { CheckCircleIcon, LoaderCircleIcon, SaveIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs = [
    {
        title: 'Cambiar contraseña',
        href: '#',
    },
];

export type PasswordForm = {
    current_password: string;
    password: string;
    password_confirmation: string;
};

export default function ProfilePage() {
    const { data, ...form } = useForm<Required<PasswordForm>>({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('admin.settings.password.update'), {
            onSuccess: () => form.reset('current_password', 'password', 'password_confirmation'),
            replace: true,
        });
    };

    return (
        <SettingsLayout breadcrumbs={breadcrumbs}>
            <Heading title="Cambiar contraseña" description="Actualiza tu contraseña aquí." size="small" />
            <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                    <Label htmlFor="current_password" className="gap-0.5">
                        Contraseña Actual<small>*</small>
                    </Label>
                    <InputPassword
                        id="current_password"
                        className="mt-1 block w-full"
                        disabled={form.processing}
                        onChange={(e) => form.setData('current_password', e.target.value)}
                        autoComplete="current-password"
                        placeholder="Contraseña actual"
                        value={data.current_password}
                        required
                    />
                    <InputError message={form.errors.current_password} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password" className="gap-0.5">
                        Nueva Contraseña<small>*</small>
                    </Label>
                    <InputPassword
                        id="password"
                        className="mt-1 block w-full"
                        disabled={form.processing}
                        onChange={(e) => form.setData('password', e.target.value)}
                        autoComplete="new-password"
                        placeholder="Nueva contraseña"
                        value={data.password}
                        required
                    />
                    <InputError message={form.errors.password} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password_confirmation" className="gap-0.5">
                        Confirmar contraseña<small>*</small>
                    </Label>
                    <InputPassword
                        id="password_confirmation"
                        className="mt-1 block w-full"
                        disabled={form.processing}
                        onChange={(e) => form.setData('password_confirmation', e.target.value)}
                        autoComplete="confirm-password"
                        placeholder="Confirmar contraseña"
                        value={data.password_confirmation}
                        required
                    />
                    <InputError message={form.errors.password_confirmation} />
                </div>
                <div className="flex items-center justify-end gap-4">
                    <Transition
                        show={form.recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-500">
                            Completado <CheckCircleIcon className="inline h-4 w-4" />
                        </p>
                    </Transition>
                    <Button disabled={form.processing}>
                        Guardar
                        {form.processing ? <LoaderCircleIcon className="animate-spin" /> : <SaveIcon />}
                    </Button>
                </div>
            </form>
        </SettingsLayout>
    );
}

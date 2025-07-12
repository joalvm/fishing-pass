import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { InertiaFormProps } from '@inertiajs/react';
import PersonFormValues from '../../types/person-form-values.type';

interface PersonUserFormProps {
    withUser: boolean;
    setWithUser: (withUser: boolean) => void;
    form: InertiaFormProps<PersonFormValues>;
}

export default function PersonUserForm({ withUser = false, setWithUser, form }: PersonUserFormProps) {
    return (
        <>
            <div className="space-y-4">
                <div className="my-6 flex items-center gap-2">
                    <Switch id="withUser" checked={withUser} onCheckedChange={() => setWithUser(!withUser)} disabled={form.processing} />
                    <Label htmlFor="withUser">Crear usuario asociado</Label>
                </div>
                {withUser && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="user_email" className="flex items-center gap-1">
                                Email<small>*</small>
                            </Label>
                            <Input
                                id="user_email"
                                type="email"
                                value={form.data.user?.email || ''}
                                onChange={(e) => form.setData('user.email' as keyof PersonFormValues, e.target.value)}
                                disabled={form.processing}
                                required
                                placeholder="Correo electrónico"
                                className="shadow-none"
                            />
                            <InputError message={form.errors?.['user.email' as keyof PersonFormValues] ?? ''} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="user_password" className="flex items-center gap-1">
                                Contraseña<small>*</small>
                            </Label>
                            <Input
                                id="user_password"
                                type="text"
                                value={form.data.user?.password || ''}
                                onChange={(e) => form.setData('user.password' as keyof PersonFormValues, e.target.value)}
                                disabled={form.processing}
                                required
                                placeholder="Contraseña"
                                className="shadow-none"
                            />
                            <InputError message={form.errors?.['user.password' as keyof PersonFormValues] ?? ''} />
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

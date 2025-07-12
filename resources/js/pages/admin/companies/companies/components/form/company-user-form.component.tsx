import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { InertiaFormProps } from '@inertiajs/react';
import CompanyFormValues from '../../types/company-form-values.type';

interface CompanyUserFormProps {
    withUser: boolean;
    setWithUser: (withUser: boolean) => void;
    form: InertiaFormProps<CompanyFormValues>;
}

export default function CompanyUserForm({ withUser = false, setWithUser, form }: CompanyUserFormProps) {
    return (
        <>
            <div className="space-y-4">
                <div className="my-6 flex items-center gap-2">
                    <Switch
                        id="withUser"
                        checked={withUser}
                        onCheckedChange={() => {
                            setWithUser(!withUser);
                        }}
                        disabled={form.processing}
                    />
                    <Label htmlFor="withUser">Crear usuario asociado</Label>
                </div>
                {withUser && (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="user_first_name" className="flex items-center gap-1">
                                Primer Nombre<small>*</small>
                            </Label>
                            <Input
                                id="user_first_name"
                                value={form.data.user?.first_name || ''}
                                onChange={(e) => form.setData('user.first_name' as keyof CompanyFormValues, e.target.value)}
                                disabled={form.processing}
                                required
                                placeholder="Nombre(s)"
                                className="shadow-none"
                            />
                            <InputError message={form.errors?.['user.first_name' as keyof CompanyFormValues] ?? ''} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="user_last_name" className="flex items-center gap-1">
                                Apellido Paterno<small>*</small>
                            </Label>
                            <Input
                                id="user_last_name"
                                value={form.data.user?.last_name || ''}
                                onChange={(e) => form.setData('user.last_name' as keyof CompanyFormValues, e.target.value)}
                                disabled={form.processing}
                                required
                                placeholder="Apellidos"
                                className="shadow-none"
                            />
                            <InputError message={form.errors?.['user.last_name' as keyof CompanyFormValues] ?? ''} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="user_email" className="flex items-center gap-1">
                                Correo usuario<small>*</small>
                            </Label>
                            <Input
                                id="user_email"
                                type="email"
                                value={form.data.user?.email || ''}
                                onChange={(e) => form.setData('user.email' as keyof CompanyFormValues, e.target.value)}
                                disabled={form.processing}
                                required
                                placeholder="Correo usuario"
                                className="shadow-none"
                            />
                            <InputError message={form.errors?.['user.email' as keyof CompanyFormValues] ?? ''} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="user_password" className="flex items-center gap-1">
                                Contraseña<small>*</small>
                            </Label>
                            <Input
                                id="user_password"
                                type="text"
                                value={form.data.user?.password || ''}
                                onChange={(e) => form.setData('user.password' as keyof CompanyFormValues, e.target.value)}
                                disabled={form.processing}
                                required
                                placeholder="Contraseña"
                                className="shadow-none"
                            />
                            <InputError message={form.errors?.['user.password' as keyof CompanyFormValues] ?? ''} />
                        </div>
                        <div className="col-span-full mt-4 flex items-center gap-2">
                            <Switch
                                id="user_notify"
                                checked={form.data.user?.notify || false}
                                onCheckedChange={(checked) => (form as InertiaFormProps<Required<CompanyFormValues>>).setData('user.notify', checked)}
                                disabled={form.processing}
                            />
                            <Label htmlFor="user_notify">Notificar usuario por correo</Label>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

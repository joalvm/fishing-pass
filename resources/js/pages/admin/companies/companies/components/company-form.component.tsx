import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import CompanyEntityType from '@/enums/company-entity-type';
import DocumentType from '@/types/document-type.type';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { CheckCircleIcon, LoaderCircleIcon, SaveIcon } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import CompanyFormValues, { CompanyUserFormValues } from '../types/company-form-values.type';

interface CompanyFormProps {
    mode: 'create' | 'edit';
    initialData?: CompanyFormValues;
    documentTypes: DocumentType[];
    onSubmit?: (values: CompanyFormValues) => void;
    processing?: boolean;
}

export function CompanyForm({ mode, initialData, documentTypes, onSubmit, processing }: CompanyFormProps) {
    const [withUser, setWithUser] = useState(false);

    const { data, setData, errors, ...form } = useForm<CompanyFormValues>({
        business_name: initialData?.business_name || '',
        document_type_id: initialData?.document_type_id || '',
        document_number: initialData?.document_number || '',
        entity_type: initialData?.entity_type || CompanyEntityType.JURIDICAL_PERSON,
        email: initialData?.email || '',
        address: initialData?.address || '',
        phone: initialData?.phone || '',
    });

    const {
        data: userData,
        setData: setUserData,
        errors: userErrors,
        ...userForm
    } = useForm<CompanyUserFormValues>({
        first_name: 'Administrador',
        last_name: 'Empresa',
        email: data.email,
        password: '',
        notify: false,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        if (mode === 'create' && withUser) {
            setData('user', userData);
        }

        if (onSubmit) {
            onSubmit(data);
            form.reset();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* Toggle Tipo de Entidad - Sin label */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="grid gap-2">
                    <RadioGroup
                        value={data.entity_type}
                        className="flex items-center gap-6"
                        id="entity_type"
                        name="entity_type"
                        required
                        disabled={processing}
                        onValueChange={(value) => {
                            setData('entity_type', value as CompanyEntityType);
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                id="entity_type_juridical_person"
                                value={CompanyEntityType.JURIDICAL_PERSON}
                                autoFocus={data.entity_type === CompanyEntityType.JURIDICAL_PERSON}
                            />
                            <Label htmlFor="entity_type_juridical_person">Persona Jurídica</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                id="entity_type_natural_person"
                                value={CompanyEntityType.NATURAL_PERSON}
                                autoFocus={data.entity_type === CompanyEntityType.NATURAL_PERSON}
                            />
                            <Label htmlFor="entity_type_natural_person">Persona Natural</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {/* Tipo de documento */}
                <div className="grid gap-2">
                    <Label htmlFor="document_type_id" className="flex items-center gap-1">
                        Tipo de documento<small>*</small>
                    </Label>
                    <Select
                        value={data.document_type_id ? String(data.document_type_id) : ''}
                        onValueChange={(v) => setData('document_type_id', v ? Number(v) : '')}
                        disabled={processing}
                        required
                    >
                        <SelectTrigger id="document_type_id" className="w-full shadow-none">
                            <SelectValue placeholder="Selecciona tipo de documento" />
                        </SelectTrigger>
                        <SelectContent>
                            {documentTypes.map((dt) => (
                                <SelectItem key={dt.id} value={String(dt.id)}>
                                    {dt.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.document_type_id} />
                </div>
                {/* Número de documento */}
                <div className="grid gap-2">
                    <Label htmlFor="document_number" className="flex items-center gap-1">
                        Número de documento<small>*</small>
                    </Label>
                    <Input
                        id="document_number"
                        value={data.document_number}
                        onChange={(e) => setData('document_number', e.target.value)}
                        disabled={processing}
                        required
                        placeholder="Número de documento"
                        className="shadow-none"
                    />
                    <InputError message={errors.document_number} />
                </div>
            </div>
            {/* Razón social */}
            <div className="grid gap-2">
                <Label htmlFor="business_name" className="flex items-center gap-1">
                    Razón social<small>*</small>
                </Label>
                <Input
                    id="business_name"
                    value={data.business_name}
                    onChange={(e) => setData('business_name', e.target.value)}
                    disabled={processing}
                    required
                    placeholder="Razón social"
                    className="shadow-none"
                />
                <InputError message={errors.business_name} />
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {/* Correo electrónico */}
                <div className="grid gap-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                        Correo electrónico<small>*</small>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        disabled={processing}
                        required
                        placeholder="Correo electrónico"
                        className="shadow-none"
                    />
                    <InputError message={errors.email} />
                </div>
                {/* Teléfono */}
                <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                        id="phone"
                        value={data.phone || ''}
                        onChange={(e) => setData('phone', e.target.value)}
                        disabled={processing}
                        placeholder="Teléfono"
                        className="shadow-none"
                    />
                    <InputError message={errors.phone} />
                </div>
            </div>

            {/* Dirección */}
            <div className="grid gap-2">
                <Label htmlFor="address" className="flex items-center gap-1">
                    Dirección<small>*</small>
                </Label>
                <Textarea
                    id="address"
                    value={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                    disabled={processing}
                    placeholder="Dirección"
                    className="shadow-none"
                    required
                />
                <InputError message={errors.address} />
            </div>

            {/* Sección usuario solo en modo creación */}
            {mode === 'create' && (
                <div className="space-y-4">
                    <div className="my-6 flex items-center gap-2">
                        <Switch
                            id="withUser"
                            checked={withUser}
                            onCheckedChange={(checked) => {
                                setWithUser(checked);
                                userForm.reset();
                                userForm.clearErrors();
                            }}
                            disabled={processing}
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
                                    value={userData.first_name || ''}
                                    onChange={(e) => setUserData('first_name', e.target.value)}
                                    disabled={processing}
                                    required
                                    placeholder="Nombre(s)"
                                    className="shadow-none"
                                />
                                <InputError message={userErrors?.['first_name'] ?? ''} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="user_last_name" className="flex items-center gap-1">
                                    Apellido Paterno<small>*</small>
                                </Label>
                                <Input
                                    id="user_last_name"
                                    value={userData.last_name || ''}
                                    onChange={(e) => setUserData('last_name', e.target.value)}
                                    disabled={processing}
                                    required
                                    placeholder="Apellidos"
                                    className="shadow-none"
                                />
                                <InputError message={userErrors?.['last_name'] ?? ''} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="user_email" className="flex items-center gap-1">
                                    Correo usuario<small>*</small>
                                </Label>
                                <Input
                                    id="user_email"
                                    type="email"
                                    value={userData.email || data.email}
                                    onChange={(e) => setUserData('email', e.target.value)}
                                    disabled={processing}
                                    required
                                    placeholder="Correo usuario"
                                    className="shadow-none"
                                />
                                <InputError message={userErrors?.['email'] ?? ''} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="user_password" className="flex items-center gap-1">
                                    Contraseña<small>*</small>
                                </Label>
                                <Input
                                    id="user_password"
                                    type="text"
                                    value={userData.password || ''}
                                    onChange={(e) => setUserData('password', e.target.value)}
                                    disabled={processing}
                                    required
                                    placeholder="Contraseña"
                                    className="shadow-none"
                                />
                                <InputError message={userErrors?.['password'] ?? ''} />
                            </div>
                            <div className="col-span-full mt-4 flex items-center gap-2">
                                <Switch
                                    id="user_notify"
                                    checked={userData.notify || false}
                                    onCheckedChange={(checked) => setUserData('notify', checked)}
                                    disabled={processing}
                                />
                                <Label htmlFor="user_notify">Notificar usuario por correo</Label>
                            </div>
                        </div>
                    )}
                </div>
            )}
            <div className="flex justify-end">
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
    );
}

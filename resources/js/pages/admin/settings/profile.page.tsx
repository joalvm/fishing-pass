import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PersonGender from '@/enums/person-gender.enum';
import Heading from '@/layouts/app/components/heading.component';
import SettingsLayout from '@/layouts/app/settings.layout';
import { SharedData } from '@/types';
import DocumentType from '@/types/document-types.type';
import { useForm, usePage } from '@inertiajs/react';
import { ShieldAlertIcon } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs = [
    {
        title: 'Configuración de perfil',
        href: '#',
    },
];

type ProfilePageProps = {
    documentTypes: DocumentType[];
};

type ProfileForm = {
    avatar_url?: string | null;
    document_type_id: number;
    document_number: string;
    first_name: string;
    middle_name?: string | null;
    last_name_paternal: string;
    last_name_maternal?: string | null;
    gender: PersonGender;
    email?: string | null;
    phone?: string | null;
};

export default function ProfilePage({ documentTypes }: ProfilePageProps) {
    const {
        auth: { person, user },
    } = usePage<SharedData>().props;

    const { data, ...form } = useForm<Required<ProfileForm>>({
        avatar_url: user?.avatar_url ?? null,
        document_type_id: person?.document_type_id ?? 0,
        document_number: person?.document_number ?? '',
        first_name: person?.first_name ?? '',
        middle_name: person?.middle_name ?? null,
        last_name_paternal: person?.last_name_paternal ?? '',
        last_name_maternal: person?.last_name_maternal ?? null,
        gender: person.gender ?? PersonGender.MALE,
        email: user?.email ?? null,
        phone: person?.phone ?? null,
    });

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        form.put(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <SettingsLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-6">
                <Heading title="Configuración de perfil" description="Actualiza tu información de perfil aquí." size="small" />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <Alert variant="default" className="mb-4 grid grid-cols-1 items-center">
                            <ShieldAlertIcon color="orange" />
                            <AlertTitle>Su dirección de correo electrónico no está verificada.</AlertTitle>
                            <AlertDescription>
                                Si no ha recibido el correo de verificación, puede solicitar que se le reenvíe el enlace de verificación.
                                <TextLink href="#">Click aquí para reenviar el correo de verificación.</TextLink>
                            </AlertDescription>
                        </Alert>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="first_name" className="gap-0.5">
                                Primer Nombre<small>*</small>
                            </Label>

                            <Input
                                id="first_name"
                                className="mt-1 block w-full"
                                value={data.first_name}
                                onChange={(e) => form.setData('first_name', e.target.value)}
                                required
                                placeholder="Primer nombre"
                            />

                            <InputError className="mt-2" message={form.errors.first_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="middle_name">Segundo Nombre</Label>

                            <Input
                                id="middle_name"
                                className="mt-1 block w-full"
                                value={data.middle_name ?? ''}
                                onChange={(e) => form.setData('middle_name', e.target.value)}
                                required
                                placeholder="Segundo nombre"
                            />

                            <InputError className="mt-2" message={form.errors.middle_name} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="last_name_paternal" className="gap-0.5">
                                Primer Apellido<small>*</small>
                            </Label>

                            <Input
                                id="last_name_paternal"
                                className="mt-1 block w-full"
                                value={data.last_name_paternal}
                                onChange={(e) => form.setData('last_name_paternal', e.target.value)}
                                required
                                placeholder="Apellido paterno"
                            />

                            <InputError className="mt-2" message={form.errors.last_name_paternal} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="last_name_maternal">Apellido Materno</Label>

                            <Input
                                id="last_name_maternal"
                                className="mt-1 block w-full"
                                value={data.last_name_maternal ?? ''}
                                onChange={(e) => form.setData('last_name_maternal', e.target.value)}
                                required
                                placeholder="Apellido Materno"
                            />

                            <InputError className="mt-2" message={form.errors.last_name_maternal} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="document_type_id" className="gap-0.5">
                                Tipo de documento<small>*</small>
                            </Label>
                            <Select
                                disabled={form.processing}
                                onValueChange={(value) => form.setData('document_type_id', parseInt(value))}
                                value={data.document_type_id.toString()}
                            >
                                <SelectTrigger id="document_type_id" className="max-w-70">
                                    <SelectValue placeholder="Seleccionar tipo" className="truncate" />
                                </SelectTrigger>
                                <SelectContent>
                                    {documentTypes.map((docType) => (
                                        <SelectItem key={docType.id} value={docType.id.toString()}>
                                            {docType.name} ({docType.abbr})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="document_number" className="gap-0.5">
                                Numero de documento<small>*</small>
                            </Label>

                            <Input
                                id="document_number"
                                className="mt-1 block w-full"
                                value={data.document_number}
                                onChange={(e) => form.setData('document_number', e.target.value)}
                                placeholder="Numero de documento"
                            />

                            <InputError className="mt-2" message={form.errors.document_number} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="gender" className="gap-0.5">
                                Genero<small>*</small>
                            </Label>
                            <Select
                                disabled={form.processing}
                                onValueChange={(value) => form.setData('gender', value as PersonGender)}
                                value={data.gender}
                            >
                                <SelectTrigger id="gender" className="w-full">
                                    <SelectValue placeholder="Seleccionar tipo" className="truncate" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[PersonGender.FEMALE, PersonGender.MALE].map((gender, index) => (
                                        <SelectItem key={index} value={gender}>
                                            {gender}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="gap-0.5">
                                Correo Electrónico<small>*</small>
                            </Label>

                            <Input
                                id="email"
                                className="mt-1 block w-full"
                                value={data.email ?? ''}
                                onChange={(e) => form.setData('email', e.target.value)}
                                placeholder="Correo Electrónico"
                            />

                            <InputError className="mt-2" message={form.errors.email} />
                        </div>
                    </div>
                </form>
            </div>
        </SettingsLayout>
    );
}

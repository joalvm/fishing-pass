import InputError from '@/components/input-error';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import CompanyEntityType from '@/enums/company-entity-type';
import AuthLayout from '@/layouts/auth-layout';
import { PageProps } from '@/types/app.type';
import DocumentType from '@/types/document-type.type';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Building2Icon, LoaderCircleIcon, SendIcon, User2Icon } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface RegisterProps extends PageProps {
    documentTypes: DocumentType[];
}

interface RegistrationForm {
    entity_type: CompanyEntityType;
    document_type_id: number;
    document_number: string;
    business_name: string;
    address: string;
    email?: string;
    phone?: string;
}

export default function RegisterPage({ documentTypes }: RegisterProps) {
    const [isJuridical, setIsJuridical] = useState(true);
    const [successRegister, setSuccesRegister] = useState(false);

    const { data, setData, ...form } = useForm<Partial<RegistrationForm>>({
        entity_type: isJuridical ? CompanyEntityType.JURIDICAL_PERSON : CompanyEntityType.NATURAL_PERSON,
        document_type_id: 3,
    });

    // Efecto para manejar el cambio de tipo de entidad
    useEffect(() => {
        if (isJuridical) {
            setData('document_type_id', 3); // RUC por defecto para persona jurídica
        } else {
            setData('document_type_id', 1); // DNI por defecto para persona natural
        }

        // Colocar el foco en el número de documento al cambiar el tipo de entidad
        const documentNumberInput = document.getElementById('document_number') as HTMLInputElement;
        if (documentNumberInput) {
            documentNumberInput.focus();
        }
    }, [isJuridical, setData]);

    // Manejar el envío del formulario
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('register.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setSuccesRegister(true);

                form.reset();
                form.clearErrors();
            },
            onError: () => {
                toast.error('Error al enviar el formulario. Por favor, revise los campos marcados.', {
                    classNames: {
                        icon: 'text-red-500',
                    },
                });
            },
        });
    };

    // Filtrar tipos de documento según el tipo de entidad
    const availableDocumentTypes = documentTypes.filter(isJuridical ? (dt) => dt.id === 3 : (dt) => dt.id !== 3);

    return (
        <AuthLayout title="FISHING PASS" description="Complete los datos de su empresa para solicitar acceso al sistema" className="w-full max-w-2xl">
            <Head title="Registro de Empresa" />
            <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Toggle Tipo de Entidad - Sin label */}
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                        <ToggleGroup
                            type="single"
                            variant="outline"
                            onValueChange={(value) => {
                                setIsJuridical(value === CompanyEntityType.JURIDICAL_PERSON);
                                setData('entity_type', value as CompanyEntityType);
                            }}
                            value={data.entity_type}
                        >
                            <ToggleGroupItem asChild value={CompanyEntityType.JURIDICAL_PERSON}>
                                <Button variant="outline" className="flex items-center space-x-2 dark:data-[state=on]:bg-accent">
                                    <Building2Icon className="h-4 w-4" />
                                    Persona juríca
                                </Button>
                            </ToggleGroupItem>
                            <ToggleGroupItem asChild value={CompanyEntityType.NATURAL_PERSON}>
                                <Button variant="outline" className="flex items-center space-x-2 dark:data-[state=on]:bg-accent">
                                    <User2Icon className="h-4 w-4" />
                                    Persona Natural
                                </Button>
                            </ToggleGroupItem>
                        </ToggleGroup>
                    </div>

                    {/* Tipo de documento */}
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="document_type_id" className="gap-0.5">
                            Tipo de documento<small>*</small>
                        </Label>
                        <Select
                            disabled={isJuridical || form.processing}
                            onValueChange={(value) => {
                                setData('document_type_id', Number.parseInt(value));
                                // Limpiar el número de documento cuando cambie el tipo
                                setData('document_number', '');
                            }}
                            value={data.document_type_id?.toString()}
                            required
                        >
                            <SelectTrigger className="w-full" id="document_type_id" aria-label="Tipo de documento">
                                <SelectValue placeholder="Seleccionar tipo" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableDocumentTypes.map((docType) => (
                                    <SelectItem key={docType.id} value={docType.id.toString()}>
                                        {docType.name} ({docType.abbr})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <InputError message={form.errors.document_type_id} />
                    </div>

                    {/* Número de documento */}
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="document_number" className="gap-0.5">
                            Numero de documento<small>*</small>
                        </Label>
                        <Input
                            id="document_number"
                            type="text"
                            value={data.document_number || ''}
                            placeholder="Número de documento"
                            disabled={form.processing}
                            onChange={(e) => setData('document_number', e.target.value)}
                            autoFocus
                            required
                        />
                        <InputError message={form.errors.document_number} />
                    </div>

                    {/* Razón social */}
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="business_name" className="gap-0.5">
                            Razón Social<small>*</small>
                        </Label>
                        <Input
                            id="business_name"
                            type="text"
                            value={data.business_name || ''}
                            placeholder="Razón social"
                            disabled={form.processing}
                            onChange={(e) => setData('business_name', e.target.value)}
                            required
                        />
                        <InputError message={form.errors.business_name} />
                    </div>

                    {/* Email y Teléfono - Ocupa 2 columnas */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email || ''}
                                placeholder="Correo electrónico"
                                disabled={form.processing}
                                onChange={(e) => setData('email', e.target.value.trim())}
                            />
                            <InputError message={form.errors.email} />
                        </div>

                        {/* Teléfono */}
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input
                                id="phone"
                                type="phone"
                                placeholder="Teléfono"
                                value={data.phone || ''}
                                onChange={(e) => setData('phone', e.target.value.trim())}
                                disabled={form.processing}
                            />
                            <InputError message={form.errors.phone} />
                        </div>
                    </div>

                    {/* Dirección */}
                    <div className="grid gap-2 md:col-span-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Textarea
                            id="address"
                            value={data.address || ''}
                            placeholder="Dirección"
                            onChange={(e) => setData('address', e.target.value)}
                            disabled={form.processing}
                        />
                        <InputError message={form.errors.address} />
                    </div>

                    {/* Botones de acción */}
                    <div className="flex flex-col space-y-4">
                        <Button className="w-full" size="lg" disabled={form.processing}>
                            {form.processing ? <LoaderCircleIcon className="h-4 w-4 animate-spin" /> : <SendIcon className="h-4 w-4" />}
                            Enviar Solicitud
                        </Button>
                        <Button type="button" variant="ghost" asChild className="w-full" disabled={form.processing}>
                            <Link href="/login">
                                <ArrowLeft className="h-4 w-4" />
                                Volver al Login
                            </Link>
                        </Button>
                    </div>
                </form>
            </div>

            {/* Dialog cuando el registro finalizó */}
            <AlertDialog open={successRegister} onOpenChange={setSuccesRegister}>
                <AlertDialogContent forceMount autoFocus>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Registro recibido</AlertDialogTitle>
                        <AlertDialogDescription>
                            Su registro ha sido completado con éxito. Ahora, su empresa deberá pasar por un proceso de validación de datos. Una vez
                            que la información haya sido verificada y los accesos hayan sido creados, nos pondremos en contacto con usted para
                            enviarle sus credenciales de acceso al sistema.
                            <br />
                            <br />
                            Agradecemos su confianza y le recordamos que este proceso puede tomar un breve periodo de tiempo. Si requiere mayor
                            información, no dude en comunicarse con nuestro equipo de soporte.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction asChild>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                    setSuccesRegister(false);
                                }}
                            >
                                Cerrar
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AuthLayout>
    );
}

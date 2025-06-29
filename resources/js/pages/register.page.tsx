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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import AuthLayout from '@/layouts/auth-layout';
import { zodResolver } from '@hookform/resolvers/zod';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Building2Icon, User2Icon } from 'lucide-react';
import { ComponentProps, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

enum CompanyEntityType {
    JURIDICAL_PERSON = 'JURIDICAL_PERSON',
    NATURAL_PERSON = 'NATURAL_PERSON',
}

// Tipos de documento del seeder
interface DocumentType {
    id: number;
    name: string;
    abbr: string;
    length_type: string;
    length: number;
    char_type: string;
}

interface RegisterProps extends ComponentProps<'form'> {
    documentTypes: DocumentType[];
}

// Schema de validación con Zod - actualizar para validación dinámica
const createCompanySchema = function (documentTypes: DocumentType[]) {
    const schema = z
        .object({
            entity_type: z.nativeEnum(CompanyEntityType),
            business_name: z.string().min(1, 'La razón social es requerida'),
            document_type_id: z.number().min(1, 'Debe seleccionar un tipo de documento'),
            document_number: z.string().min(1, 'El número de documento es requerido'),
            email: z.string().email('Debe ingresar un email válido'),
            phone: z.string().nullable().optional(),
            address: z.string().min(1, 'La dirección es requerida'),
        })
        .refine(
            (data) => {
                const docType = documentTypes.find((dt) => dt.id === data.document_type_id);

                // Si no se encuentra el tipo de documento, no se aplica validación adicional
                if (!docType) return true;

                // Validación de longitud
                if (docType.length_type === 'EXACT' && data.document_number.length !== docType.length) {
                    return false;
                }
                if (docType.length_type === 'MAX' && data.document_number.length > docType.length) {
                    return false;
                }

                // Validación de tipo de caracteres
                if (docType.char_type === 'NUMERIC' && !/^\d+$/.test(data.document_number)) {
                    return false;
                }
                if (docType.char_type === 'ALPHA_NUMERIC' && !/^[a-zA-Z0-9]+$/.test(data.document_number)) {
                    return false;
                }

                return true;
            },
            (data) => {
                const docType = documentTypes.find((dt) => dt.id === data.document_type_id);
                if (!docType) return { message: 'Tipo de documento no válido', path: ['document_type_id'] };

                let message = '';
                if (docType.length_type === 'EXACT') {
                    message = `Máx. ${docType.length} caracteres.\n`;
                } else if (docType.length_type === 'MAX') {
                    message = `El número de caracteres no puede exceder ${docType.length}. \n`;
                }

                if (docType.char_type === 'NUMERIC') {
                    message += '\nDebe contener solo números.';
                } else if (docType.char_type === 'ALPHA_NUMERIC') {
                    message += '\nDebe contener solo caracteres alfanuméricos.';
                }

                return { message, path: ['document_number'] };
            },
        );

    return schema;
};

export default function Register({ className, documentTypes, ...props }: RegisterProps) {
    const [isJuridical, setIsJuridical] = useState(true);
    const [successRegister, setSuccesRegister] = useState(false);

    const schema = createCompanySchema(documentTypes);
    const form = useForm({
        mode: 'onChange',
        resolver: zodResolver(schema),
        defaultValues: {
            entity_type: isJuridical ? CompanyEntityType.JURIDICAL_PERSON : CompanyEntityType.NATURAL_PERSON,
            document_type_id: 3, // RUC por defecto
            document_number: '',
            business_name: '',
            email: '',
            address: '',
        },
    });

    // Efecto para manejar el cambio de tipo de entidad
    useEffect(() => {
        if (isJuridical) {
            form.setValue('entity_type', CompanyEntityType.JURIDICAL_PERSON);
            form.setValue('document_type_id', 3); // RUC por defecto para persona jurídica
        } else {
            form.setValue('entity_type', CompanyEntityType.NATURAL_PERSON);
            form.setValue('document_type_id', 1); // DNI por defecto para persona natural
        }
    }, [isJuridical, form]);

    // Manejar el envío del formulario
    const onSubmit = (data: any) => {
        router.post('/register', data, {
            onSuccess: () => {
                setSuccesRegister(true);
                form.reset();
                setIsJuridical(true);
            },
            onError: (errors) => {
                toast.error('Error al registrar la empresa. Verifique los datos e intente nuevamente.');

                Object.keys(errors || {}).forEach((key) => {
                    const message = Array.isArray(errors[key]) ? errors[key].join('\n') : errors[key];
                    form.setError(key as unknown as typeof data, { type: 'manual', message });
                });
            },
        });
    };

    // Filtrar tipos de documento según el tipo de entidad
    const availableDocumentTypes = documentTypes.filter(isJuridical ? (dt) => dt.id === 3 : (dt) => dt.id !== 3);

    return (
        <AuthLayout title="FISHING PASS" description="Complete los datos de su empresa para solicitar acceso al sistema" className="w-full max-w-2xl">
            <Head title="Registro de Empresa" />
            <Toaster position="top-center" />
            <div className="mx-auto flex w-full max-w-lg flex-col justify-center space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} {...props} className="space-y-6">
                        {/* Toggle Tipo de Entidad - Sin label */}
                        <div className="flex space-x-4">
                            <ToggleGroup
                                type="single"
                                variant="outline"
                                onValueChange={(value) => {
                                    setIsJuridical(value === CompanyEntityType.JURIDICAL_PERSON);
                                    if (value === CompanyEntityType.JURIDICAL_PERSON) {
                                        form.setFocus('document_number');
                                    } else {
                                        form.setFocus('document_type_id');
                                    }
                                }}
                                value={form.watch('entity_type')}
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

                        {/* Grid de dos columnas */}
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Tipo de documento */}
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="document_type_id"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel>Tipo de Documento *</FormLabel>
                                            <Select
                                                disabled={isJuridical || form.formState.isSubmitting}
                                                {...field}
                                                onValueChange={(value) => {
                                                    form.setValue('document_type_id', Number.parseInt(value));
                                                    // Limpiar el número de documento cuando cambie el tipo
                                                    form.setValue('document_number', '');
                                                }}
                                                value={form.watch('document_type_id')?.toString()}
                                            >
                                                <FormControl className="w-full">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Seleccionar tipo" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {availableDocumentTypes.map((docType) => (
                                                        <SelectItem key={docType.id} value={docType.id.toString()}>
                                                            {docType.name} ({docType.abbr})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="absolute -bottom-4 text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Número de documento */}
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="document_number"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel>Número de Documento *</FormLabel>
                                            <FormControl>
                                                <Input
                                                    autoFocus
                                                    type="text"
                                                    placeholder="Número de documento"
                                                    disabled={form.formState.isSubmitting}
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage className="absolute -bottom-4 text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Razón social - Ocupa 2 columnas */}
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="business_name"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel>Razón Social *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Razón Social" {...field} disabled={form.formState.isSubmitting} />
                                            </FormControl>
                                            <FormMessage className="absolute -bottom-4 text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel>Email *</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Correo Electrónico" {...field} disabled={form.formState.isSubmitting} />
                                            </FormControl>
                                            <FormMessage className="absolute -bottom-4 text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Teléfono */}
                            <div>
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel>Teléfono</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Teléfono"
                                                    {...field}
                                                    value={field.value ?? ''}
                                                    disabled={form.formState.isSubmitting}
                                                />
                                            </FormControl>
                                            <FormMessage className="absolute -bottom-4 text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* Dirección - Ocupa 2 columnas */}
                            <div className="md:col-span-2">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="relative">
                                            <FormLabel>Dirección *</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Dirección" {...field} disabled={form.formState.isSubmitting} />
                                            </FormControl>
                                            <FormMessage className="absolute -bottom-4 text-xs" />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex flex-col space-y-4 pt-6">
                            <Button type="submit" size="lg" className="w-full" disabled={form.formState.isSubmitting}>
                                Enviar Solicitud
                            </Button>
                            <Button variant="ghost" size="lg" asChild className="w-full" disabled={form.formState.isSubmitting}>
                                <Link href="/">
                                    <ArrowLeft className="h-4 w-4" />
                                    Volver al Login
                                </Link>
                            </Button>
                        </div>
                    </form>
                </Form>
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

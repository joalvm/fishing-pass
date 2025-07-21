import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PersonGender from '@/enums/person-gender.enum';
import DocumentType from '@/types/document-type.type';
import { InertiaFormProps } from '@inertiajs/react';
import { useEffect } from 'react';
import StaffFormValues from '../../types/staff-form-values.type';

interface StaffFormProps {
    form: InertiaFormProps<StaffFormValues>;
    documentTypes: DocumentType[];
}

export default function StaffForm({ form, documentTypes }: StaffFormProps) {
    useEffect(() => {
        if (form.data.document_type_id && !documentTypes.some((dt) => dt.id === form.data.document_type_id)) {
            form.setData('document_type_id', documentTypes[0]?.id ?? '');
        }
    }, [documentTypes]);

    return (
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2">
            <div className="grid gap-2">
                <Label htmlFor="first_name">
                    Nombres<small>*</small>
                </Label>
                <Input
                    id="first_name"
                    value={form.data.first_name || ''}
                    onChange={(e) => form.setData('first_name', e.target.value)}
                    disabled={form.processing}
                    required
                    placeholder="Nombres"
                    className="shadow-none"
                />
                <InputError message={form.errors.first_name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="middle_name">Segundo nombre</Label>
                <Input
                    id="middle_name"
                    value={form.data.middle_name || ''}
                    onChange={(e) => form.setData('middle_name', e.target.value)}
                    disabled={form.processing}
                    placeholder="Segundo nombre"
                    className="shadow-none"
                />
                <InputError message={form.errors.middle_name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="last_name_paternal">
                    Apellido paterno<small>*</small>
                </Label>
                <Input
                    id="last_name_paternal"
                    value={form.data.last_name_paternal || ''}
                    onChange={(e) => form.setData('last_name_paternal', e.target.value)}
                    disabled={form.processing}
                    required
                    placeholder="Apellido paterno"
                    className="shadow-none"
                />
                <InputError message={form.errors.last_name_paternal} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="last_name_maternal">Apellido materno</Label>
                <Input
                    id="last_name_maternal"
                    value={form.data.last_name_maternal || ''}
                    onChange={(e) => form.setData('last_name_maternal', e.target.value)}
                    disabled={form.processing}
                    placeholder="Apellido materno"
                    className="shadow-none"
                />
                <InputError message={form.errors.last_name_maternal} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="document_type_id">
                    Tipo de documento<small>*</small>
                </Label>
                <Select
                    value={form.data.document_type_id.toString()}
                    onValueChange={(v) => form.setData('document_type_id', Number(v))}
                    disabled={form.processing}
                    required
                >
                    <SelectTrigger id="document_type_id" className="w-full shadow-none">
                        <SelectValue placeholder="Selecciona tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                        {documentTypes
                            .filter((dt) => dt.id !== 3)
                            .map((dt) => (
                                <SelectItem key={dt.id} value={String(dt.id)}>
                                    {dt.name}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
                <InputError message={form.errors.document_type_id} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="document_number">
                    N° documento<small>*</small>
                </Label>
                <Input
                    id="document_number"
                    value={form.data.document_number || ''}
                    onChange={(e) => form.setData('document_number', e.target.value)}
                    disabled={form.processing}
                    required
                    placeholder="N° documento"
                    className="shadow-none"
                />
                <InputError message={form.errors.document_number} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="gender">
                    Género<small>*</small>
                </Label>
                <Select
                    value={form.data.gender ?? PersonGender.FEMALE}
                    onValueChange={(val) => form.setData('gender', val as PersonGender)}
                    disabled={form.processing}
                    required
                >
                    <SelectTrigger id="gender" className="w-full shadow-none">
                        <SelectValue placeholder="Selecciona género" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={PersonGender.MALE}>Masculino</SelectItem>
                        <SelectItem value={PersonGender.FEMALE}>Femenino</SelectItem>
                    </SelectContent>
                </Select>
                <InputError message={form.errors.gender} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input
                    id="phone"
                    value={form.data.phone || ''}
                    onChange={(e) => form.setData('phone', e.target.value || undefined)}
                    disabled={form.processing}
                    placeholder="Teléfono"
                    className="shadow-none"
                />
                <InputError message={form.errors.phone} />
            </div>
        </div>
    );
}

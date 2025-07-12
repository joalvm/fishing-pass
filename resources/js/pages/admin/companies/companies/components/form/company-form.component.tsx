import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import CompanyEntityType from '@/enums/company-entity-type';
import { cn } from '@/lib/utils';
import DocumentType from '@/types/document-type.type';
import { InertiaFormProps } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import CompanyFormValues from '../../types/company-form-values.type';

interface CompanyFormProps {
    form: InertiaFormProps<CompanyFormValues>;
    documentTypes: DocumentType[];
}

export function CompanyForm({ form, documentTypes }: CompanyFormProps) {
    const [isJuridical, setIsJuridical] = useState(form.data.entity_type === CompanyEntityType.JURIDICAL_PERSON);

    useEffect(() => {
        if (isJuridical) {
            form.setData('document_type_id', 3); // RUC por defecto para persona jurídica
        } else {
            form.setData('document_type_id', 1); // DNI por defecto para persona natural
        }

        // Colocar el foco en el número de documento al cambiar el tipo de entidad
        const documentNumberInput = document.getElementById('document_number') as HTMLInputElement;
        if (documentNumberInput) {
            documentNumberInput.focus();
        }
    }, [isJuridical]); // eslint-disable-line react-hooks/exhaustive-deps

    const documentTypesFiltered = documentTypes.filter(isJuridical ? (dt) => dt.id === 3 : (dt) => dt.id !== 3);

    return (
        <>
            {/* Toggle Tipo de Entidad - Sin label */}
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <div className="grid gap-2">
                    <RadioGroup
                        value={form.data.entity_type}
                        className="flex items-center gap-6"
                        id="entity_type"
                        name="entity_type"
                        required
                        disabled={form.processing}
                        onValueChange={(value) => {
                            setIsJuridical(value === CompanyEntityType.JURIDICAL_PERSON);
                            form.setData('entity_type', value as CompanyEntityType);
                            form.setData('document_number', '');
                        }}
                    >
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                id="entity_type_juridical_person"
                                value={CompanyEntityType.JURIDICAL_PERSON}
                                autoFocus={form.data.entity_type === CompanyEntityType.JURIDICAL_PERSON}
                            />
                            <Label htmlFor="entity_type_juridical_person">Persona Jurídica</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <RadioGroupItem
                                id="entity_type_natural_person"
                                value={CompanyEntityType.NATURAL_PERSON}
                                autoFocus={form.data.entity_type === CompanyEntityType.NATURAL_PERSON}
                            />
                            <Label htmlFor="entity_type_natural_person">Persona Natural</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
            <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-2">
                {/* Tipo de documento */}
                <div className="grid gap-2">
                    <Label htmlFor="document_type_id" className="flex items-center gap-1">
                        Tipo de documento<small>*</small>
                    </Label>
                    <Select
                        value={form.data.document_type_id ? String(form.data.document_type_id) : ''}
                        onValueChange={(v) => form.setData('document_type_id', v ? Number(v) : '')}
                        disabled={form.processing || isJuridical}
                        required
                    >
                        <SelectTrigger id="document_type_id" className="w-full shadow-none">
                            <SelectValue placeholder="Selecciona tipo de documento" />
                        </SelectTrigger>
                        <SelectContent>
                            {documentTypesFiltered.map((dt) => (
                                <SelectItem key={dt.id} value={String(dt.id)}>
                                    {dt.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={form.errors.document_type_id} />
                </div>
                {/* Número de documento */}
                <div className="grid gap-2">
                    <Label htmlFor="document_number" className={cn('flex items-center gap-1', { 'text-destructive': !!form.errors.document_number })}>
                        Número de documento<small>*</small>
                    </Label>
                    <Input
                        id="document_number"
                        value={form.data.document_number}
                        aria-invalid={!!form.errors.document_number}
                        autoFocus
                        onChange={(e) => form.setData('document_number', e.target.value)}
                        disabled={form.processing}
                        required
                        placeholder="Número de documento"
                        className="shadow-none"
                    />
                    <InputError message={form.errors.document_number} />
                </div>
            </div>
            {/* Razón social */}
            <div className="grid gap-2">
                <Label htmlFor="business_name" className={cn('flex items-center gap-1', { 'text-destructive': !!form.errors.business_name })}>
                    Razón social<small>*</small>
                </Label>
                <Input
                    id="business_name"
                    value={form.data.business_name}
                    onChange={(e) => form.setData('business_name', e.target.value)}
                    aria-invalid={!!form.errors.business_name}
                    disabled={form.processing}
                    required
                    placeholder="Razón social"
                    className="shadow-none"
                />
                <InputError message={form.errors.business_name} />
            </div>

            <div className="grid grid-cols-1 items-start gap-2 md:grid-cols-2">
                {/* Correo electrónico */}
                <div className="grid gap-2">
                    <Label htmlFor="email" className={cn('flex items-center gap-1', { 'text-destructive': !!form.errors.email })}>
                        Correo electrónico<small>*</small>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={form.data.email}
                        aria-invalid={!!form.errors.email}
                        onChange={(e) => form.setData('email', e.target.value)}
                        disabled={form.processing}
                        required
                        placeholder="Correo electrónico"
                        className="shadow-none"
                    />
                    <InputError message={form.errors.email} />
                </div>
                {/* Teléfono */}
                <div className="grid gap-2">
                    <Label htmlFor="phone" className={cn('flex items-center gap-1', { 'text-destructive': !!form.errors.phone })}>
                        Teléfono
                    </Label>
                    <Input
                        id="phone"
                        value={form.data.phone || ''}
                        onChange={(e) => form.setData('phone', e.target.value === '' ? undefined : e.target.value)}
                        aria-invalid={!!form.errors.phone}
                        disabled={form.processing}
                        placeholder="Teléfono"
                        className="shadow-none"
                    />
                    <InputError message={form.errors.phone} />
                </div>
            </div>
            {/* Dirección */}
            <div className="grid gap-2">
                <Label htmlFor="address" className={cn('flex items-center gap-1', { 'text-destructive': !!form.errors.address })}>
                    Dirección<small>*</small>
                </Label>
                <Textarea
                    id="address"
                    value={form.data.address}
                    onChange={(e) => form.setData('address', e.target.value)}
                    aria-invalid={!!form.errors.address}
                    disabled={form.processing}
                    placeholder="Dirección"
                    className="shadow-none"
                    required
                />
                <InputError message={form.errors.address} />
            </div>
        </>
    );
}

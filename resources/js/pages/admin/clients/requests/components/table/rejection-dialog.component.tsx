import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { PageProps } from '@/types/app.type';
import { useForm } from '@inertiajs/react';
import { FormEvent, useEffect } from 'react';
import { toast } from 'sonner';
import RegistrationStatus from '../../enums/registration-status.enum';
import RegistrationRequest from '../../types/registration-request.type';

interface RejectionDialogProps {
    request: RegistrationRequest | null;
    onClose: () => void;
}

export default function RejectionDialog({ request, onClose }: RejectionDialogProps) {
    const { data, ...form } = useForm({
        status: RegistrationStatus.REJECTED,
        rejection_reason: '',
    });

    useEffect(() => {
        if (!request) {
            form.reset();
        }
    }, [request]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!request) return;

        form.put(route('admin.clients.requests.update', request.id), {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = (page.props as unknown as PageProps).flash;
                if (flash?.error) {
                    toast.error(flash.message as string);
                } else {
                    toast.success('Se rechazó la solicitud correctamente.');
                    onClose();
                }
            },
            onError: (page) => {
                toast.error('Hubo un error al rechazar la solicitud.');
            },
        });
    };

    return (
        <Dialog open={request !== null} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Motivo del Rechazo</DialogTitle>
                        <DialogDescription>Especifique el motivo por el cual se rechaza esta solicitud. Este paso es obligatorio.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Textarea
                            id="rejection_reason"
                            placeholder="Escriba aquí el motivo del rechazo..."
                            value={request?.rejected_reason || data.rejection_reason}
                            disabled={!!request?.rejected_reason || form.processing}
                            onChange={(e) => form.setData('rejection_reason', e.target.value)}
                            rows={4}
                        />
                        {form.errors.rejection_reason && <p className="text-sm text-red-500">{form.errors.rejection_reason}</p>}
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose} disabled={form.processing}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={!data.rejection_reason || !!request?.rejected_reason || form.processing}>
                            {form.processing ? 'Rechazando...' : 'Confirmar Rechazo'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

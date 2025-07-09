import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PageProps } from '@/types/app.type';
import { useForm } from '@inertiajs/react';
import { AlertCircleIcon, BanknoteXIcon, LoaderCircleIcon, XIcon } from 'lucide-react';
import { FormEvent, useEffect } from 'react';
import { toast } from 'sonner';
import { useRequests } from '../contexts/requests.context';
import RegistrationStatus from '../enums/registration-status.enum';

export default function RejectionDialog() {
    const { dialogs } = useRequests();
    const { rejection } = dialogs;
    const { request, close } = rejection;
    const { data, ...form } = useForm({
        status: RegistrationStatus.REJECTED,
        rejection_reason: '',
    });

    useEffect(() => {
        if (!request) {
            form.reset();
        }
    }, [request, form]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!request) return;

        form.put(route('admin.companies.requests.update', request.id), {
            preserveScroll: true,
            onSuccess: (page) => {
                const flash = (page.props as unknown as PageProps).flash;
                if (flash?.error) {
                    toast.error(flash.message as string);
                } else {
                    toast.success('Se rechazó la solicitud correctamente.');
                    close();
                }
            },
            onError: () => {
                toast.error('Hubo un error al rechazar la solicitud.');
            },
        });
    };

    return (
        <AlertDialog open={rejection.isOpen} onOpenChange={(open) => !open && close()}>
            <AlertDialogContent>
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertCircleIcon className="h-5 w-5 text-destructive" />
                            <span>Confirmar Rechazo</span>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="pt-2">
                            Especifique el motivo por el cual se rechaza esta solicitud. Este paso es obligatorio.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="py-4">
                        <Textarea
                            id="rejection_reason"
                            placeholder="Escriba aquí el motivo del rechazo..."
                            value={request?.rejected_reason || data.rejection_reason}
                            disabled={!!request?.rejected_reason || form.processing}
                            onChange={(e) => form.setData('rejection_reason', e.target.value)}
                            rows={4}
                            className="min-h-[120px]"
                        />
                        {form.errors.rejection_reason && <p className="mt-2 text-sm text-destructive">{form.errors.rejection_reason}</p>}
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                            <Button variant="outline" className="flex items-center gap-2" disabled={form.processing}>
                                <XIcon className="h-4 w-4" />
                                <span>Cancelar</span>
                            </Button>
                        </AlertDialogCancel>
                        <Button
                            type="submit"
                            variant="destructive"
                            disabled={!data.rejection_reason || !!request?.rejected_reason || form.processing}
                            className="flex items-center gap-2"
                        >
                            {form.processing ? (
                                <>
                                    <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                                    <span>Rechazando...</span>
                                </>
                            ) : (
                                <>
                                    <BanknoteXIcon className="h-4 w-4" />
                                    <span>Confirmar Rechazo</span>
                                </>
                            )}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PageProps } from '@/types/app.type';
import { useForm } from '@inertiajs/react';
import { FormEvent, useEffect } from 'react';
import { toast } from 'sonner';
import { CheckCircle2Icon, LoaderCircleIcon, XIcon } from 'lucide-react';
import { useRequests } from '../contexts/requests.context';
import RegistrationStatus from '../enums/registration-status.enum';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function ApprovalDialog() {
    const { dialogs } = useRequests();
    const { approval } = dialogs;
    const { request, close, notifyByEmail, setNotifyByEmail } = approval;

    const form = useForm<{ notify_by_email: boolean; status: RegistrationStatus }>({
        status: RegistrationStatus.APPROVED,
        notify_by_email: true,
    });

    useEffect(() => {
        if (request) {
            form.setData('notify_by_email', notifyByEmail);
        } else {
            form.reset();
        }
    }, [request, notifyByEmail]);

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
                    toast.success('La solicitud ha sido aprobada correctamente.');
                    close();
                }
            },
            onError: () => {
                toast.error('Hubo un error al aprobar la solicitud.');
            },
        });
    };

    if (!request || request.status !== RegistrationStatus.PENDING) return null;

    return (
        <AlertDialog open={approval.isOpen} onOpenChange={(open) => !open && close()}>
            <AlertDialogContent>
                <form onSubmit={handleSubmit}>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <CheckCircle2Icon className="h-5 w-5 text-green-600" />
                            <span>Confirmar Aprobación</span>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="pt-2">
                            ¿Está seguro que desea aprobar la solicitud de <span className="font-medium text-foreground">{request.business_name}</span>?
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="py-4">
                        <div className="flex items-start justify-between rounded-lg border p-4">
                            <div className="space-y-1.5 pr-4">
                                <Label htmlFor="notify-by-email" className="text-base font-medium">
                                    Notificar al usuario
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    Se enviará un correo de confirmación al usuario con los detalles de la aprobación.
                                </p>
                            </div>
                            <Switch
                                id="notify-by-email"
                                checked={notifyByEmail}
                                onCheckedChange={setNotifyByEmail}
                                disabled={form.processing}
                                className="mt-1"
                            />
                        </div>
                    </div>

                    <AlertDialogFooter className="gap-3 sm:gap-2">
                        <AlertDialogCancel asChild>
                            <Button variant="outline" className="flex items-center gap-2" disabled={form.processing}>
                                <XIcon className="h-4 w-4" />
                                <span>Cancelar</span>
                            </Button>
                        </AlertDialogCancel>
                        <Button
                            type="submit"
                            disabled={form.processing}
                            className="flex items-center gap-2 focus-visible:ring-green-600/50  bg-green-600 hover:bg-green-700"
                        >
                            {form.processing ? (
                                <>
                                    <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                                    <span>Procesando...</span>
                                </>
                            ) : (
                                <>
                                    <CheckCircle2Icon className="h-4 w-4" />
                                    <span>Confirmar Aprobación</span>
                                </>
                            )}
                        </Button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}

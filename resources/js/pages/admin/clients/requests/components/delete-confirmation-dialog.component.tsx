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
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { LoaderCircleIcon, Trash2Icon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useRequests } from '../contexts/requests.context';

export default function DeleteConfirmationDialog() {
    const { dialogs } = useRequests();
    const { deleteConfirmation } = dialogs;
    const { isOpen, request, close, isDeleting } = deleteConfirmation;
    const { delete: deleteRequest, processing } = useForm();

    if (!request) return null;

    const handleDelete = () => {
        deleteRequest(route('admin.clients.requests.destroy', request.id), {
            preserveScroll: true,
            preserveState: true,
            only: ['requests', 'filters'], // Preserve these props from the current page
            onSuccess: () => {
                toast.success('La solicitud ha sido eliminada correctamente.');
                close();
            },
            onError: () => {
                toast.error('Ocurrió un error al intentar eliminar la solicitud.');
            },
        });
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={(open) => !open && close()}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Trash2Icon className="h-5 w-5 text-destructive" />
                        <span>Confirmar eliminación</span>
                    </AlertDialogTitle>
                    <AlertDialogDescription className="pt-2">
                        ¿Estás seguro de que deseas eliminar esta solicitud? Esta acción es irreversible y no se podrá deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline" className="flex items-center gap-2" disabled={isDeleting} autoFocus>
                            <XIcon className="h-4 w-4" />
                            <span>Cancelar</span>
                        </Button>
                    </AlertDialogCancel>
                        <Button variant="destructive" onClick={handleDelete} disabled={processing} className="flex items-center gap-2">
                            {processing ? (
                                <>
                                    <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                                    <span>Eliminando...</span>
                                </>
                            ) : (
                                <>
                                    <Trash2Icon className="h-4 w-4" />
                                    <span>Sí, eliminar</span>
                                </>
                            )}
                        </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

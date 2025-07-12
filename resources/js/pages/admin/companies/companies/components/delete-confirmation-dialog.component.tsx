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
import { useForm } from '@inertiajs/react';
import { LoaderCircleIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { useCompanies } from '../contexts/companies.context';

export default function DeleteConfirmationDialog() {
    const { deleteDialog, closeDeleteDialog } = useCompanies();
    const form = useForm();

    if (!deleteDialog || !deleteDialog.company) {
        return null;
    }

    const handleDelete = () => {
        form.delete(route('admin.companies.destroy', deleteDialog?.company?.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('La empresa ha sido eliminada correctamente.');
                closeDeleteDialog();
            },
            onError: () => {
                toast.error('Ocurrió un error al intentar eliminar la solicitud.');
            },
        });
    };

    return (
        <AlertDialog open={deleteDialog.isOpen} onOpenChange={closeDeleteDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Trash2Icon className="h-5 w-5 text-destructive" />
                        Eliminar empresa
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        ¿Estás seguro que deseas eliminar la empresa <b>{deleteDialog.company?.business_name}</b>? Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleteDialog.isDeleting} onClick={closeDeleteDialog}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-white hover:bg-destructive/90"
                        onClick={handleDelete}
                        disabled={deleteDialog.isDeleting}
                    >
                        {deleteDialog.isDeleting ? (
                            <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2Icon className="mr-2 h-4 w-4" />
                        )}
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

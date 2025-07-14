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
import { usePersons } from '../contexts/persons.context';

export default function DeleteConfirmationDialog() {
    const { deleteDialog, closeDeleteDialog, setDeleting } = usePersons();
    const form = useForm();

    if (!deleteDialog || !deleteDialog.person) {
        return null;
    }

    const handleDelete = () => {
        setDeleting(true);
        form.delete(route('admin.persons.destroy', deleteDialog?.person?.id), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('El personal ha sido eliminado correctamente.');
                closeDeleteDialog();
            },
            onError: () => {
                toast.error('Ocurrió un error al intentar eliminar el registro.');
            },
            onFinish: () => {
                setDeleting(false);
            },
        });
    };

    return (
        <AlertDialog open={deleteDialog.isOpen} onOpenChange={closeDeleteDialog}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Trash2Icon className="h-5 w-5 text-destructive" />
                        Eliminar personal
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        ¿Estás seguro que deseas eliminar a{' '}
                        <b>
                            {deleteDialog.person?.first_name} {deleteDialog.person?.last_name_paternal}
                        </b>
                        ? Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={deleteDialog.isDeleting} onClick={closeDeleteDialog}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-red-700"
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

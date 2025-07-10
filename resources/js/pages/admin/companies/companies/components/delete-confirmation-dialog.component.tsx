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
import { LoaderCircleIcon, Trash2Icon } from 'lucide-react';
import { useCompanies } from '../contexts/companies.context';

export default function DeleteConfirmationDialog() {
    const { deleteDialog, closeDeleteDialog, setDeleting } = useCompanies();

    // Aquí iría la lógica para eliminar la empresa usando Inertia o fetch
    const handleDelete = async () => {
        setDeleting(true);
        // Simular delay de borrado
        setTimeout(() => {
            setDeleting(false);
            closeDeleteDialog();
            // Aquí puedes disparar un toast de éxito
        }, 1200);
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

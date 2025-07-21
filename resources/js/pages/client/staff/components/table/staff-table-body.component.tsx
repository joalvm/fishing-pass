import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { MoreHorizontalIcon, PencilIcon, Trash2Icon } from 'lucide-react';
import { useStaffPage } from '../../staff-page.context';

export default function StaffTableBody() {
    const { persons, openDeleteDialog } = useStaffPage();

    if (!persons.data.length) {
        return (
            <TableBody>
                <TableRow>
                    <TableCell colSpan={8} className="py-6 text-center text-muted-foreground">
                        No hay registros para mostrar.
                    </TableCell>
                </TableRow>
            </TableBody>
        );
    }

    return (
        <TableBody>
            {persons.data.map((person) => (
                <TableRow key={person.id} className="transition-colors hover:bg-muted/50">
                    <TableCell>{person.first_name}</TableCell>
                    <TableCell>{person.last_name_paternal}</TableCell>
                    <TableCell>{person.last_name_maternal}</TableCell>
                    <TableCell>{person.gender}</TableCell>
                    <TableCell>{person.document_type?.name}</TableCell>
                    <TableCell>{person.document_number}</TableCell>
                    <TableCell>{person.phone}</TableCell>
                    <TableCell className="text-center">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menú</span>
                                    <MoreHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => (window.location.href = route('client.staff.edit', person.id))}>
                                    <PencilIcon className="mr-2 h-4 w-4" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => openDeleteDialog(person)} className="text-destructive focus:text-destructive">
                                    <Trash2Icon className="mr-2 h-4 w-4" /> Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
}

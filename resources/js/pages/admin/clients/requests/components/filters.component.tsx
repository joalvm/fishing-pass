import { Input } from '@/components/ui/input';
import { useRequests } from '../contexts/requests.context';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import RegistrationStatus, { RegistrationStatusLabel } from '../enums/registration-status.enum';

export function Filters() {
    const { filters, setSearchTerm, setStatuses } = useRequests();

    const handleStatusChange = (status: RegistrationStatus, checked: boolean) => {
        const newStatuses = checked
            ? [...filters.statuses, status]
            : filters.statuses.filter(s => s !== status);
        setStatuses(newStatuses);
    };

    const getStatusColor = (status: RegistrationStatus) => {
        switch (status) {
            case RegistrationStatus.APPROVED:
                return 'bg-green-500';
            case RegistrationStatus.PENDING:
                return 'bg-blue-500';
            case RegistrationStatus.REJECTED:
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="flex items-center justify-between py-4">
            <Input
                type='search'
                placeholder="Buscar por nombre de empresa..."
                value={filters.searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="max-w-sm shadow-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-primary"
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">Estado</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por estado</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {Object.values(RegistrationStatus).map(status => (
                        <DropdownMenuCheckboxItem
                            key={status}
                            checked={filters.statuses.includes(status)}
                            onCheckedChange={checked => handleStatusChange(status, !!checked)}
                        >
                            <div className={`mr-2 h-2 w-2 rounded-full ${getStatusColor(status)}`} />
                            <span>{RegistrationStatusLabel(status)}</span>
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

import { Input } from '@/components/ui/input';
import { useStaffPage } from '../../staff-page.context';

export default function SearchFilter() {
    const { searchTerm, handleSetSearchTerm } = useStaffPage();
    return (
        <Input
            type="search"
            placeholder="Buscar por nombre, documento, email..."
            value={searchTerm}
            autoFocus
            onChange={(e) => handleSetSearchTerm(e.target.value)}
            className="max-w-sm shadow-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
        />
    );
}

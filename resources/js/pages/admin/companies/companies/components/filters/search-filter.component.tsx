import { Input } from '@/components/ui/input';
import { useCompanies } from '../../contexts/companies.context';

export default function SearchFilter() {
    const { searchTerm, handleSetSearchTerm } = useCompanies();
    return (
        <Input
            type="search"
            placeholder="Buscar por nombre de empresa..."
            value={searchTerm}
            autoFocus
            onChange={(e) => handleSetSearchTerm(e.target.value)}
            className="max-w-sm shadow-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0"
        />
    );
}

import { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { Filter, Paginate } from '@/types/app.type';
import RegistrationRequest from '../types/registration-request.type';
import { useDebounce } from '@/hooks/use-debounce.hook';
import RegistrationStatus from '../enums/registration-status.enum';
import { router } from '@inertiajs/react';

interface RequestsContextType {
    requests: Paginate<RegistrationRequest>;
    filters: {
        searchTerm: string;
        statuses: RegistrationStatus[];
    };
    pagination: {
        page: number;
        perPage: number;
    };
    setSearchTerm: (term: string) => void;
    setStatuses: (statuses: RegistrationStatus[]) => void;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export function RequestsProvider({ children, initialRequests, initialFilters }: { children: ReactNode; initialRequests: Paginate<RegistrationRequest>; initialFilters: Filter<RegistrationRequest> }) {
    const [requests, setRequests] = useState(initialRequests);
    const [searchTerm, setSearchTerm] = useState(initialFilters.contains?.text ?? '');
    const [statuses, setStatuses] = useState(Array.isArray(initialFilters.statuses) ? initialFilters.statuses : []);
    const [page, setPage] = useState(initialFilters.page ?? DEFAULT_PAGE);
    const [perPage, setPerPage] = useState(initialFilters.perPage ?? DEFAULT_PER_PAGE);

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        setRequests(initialRequests);
    }, [initialRequests]);

    useEffect(() => {
        const params = {} as Filter<RegistrationRequest>;

        if (debouncedSearchTerm) params.contains = { items: ['business_name', 'document_number'], text: debouncedSearchTerm };
        if (statuses.length > 0) params.statuses = statuses;
        if (perPage !== DEFAULT_PER_PAGE) params.per_page = perPage;
        if (page !== DEFAULT_PAGE) params.page = page;

        router.get(location.pathname, params as any, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });

    }, [debouncedSearchTerm, statuses, page, perPage]);

    const handleSetSearchTerm = (term: string) => {
        setSearchTerm(term);
        setPage(DEFAULT_PAGE);
    };

    const handleSetStatuses = (statuses: RegistrationStatus[]) => {
        setStatuses(statuses);
        setPage(DEFAULT_PAGE);
    };

    const handleSetPerPage = (num: number) => {
        setPerPage(num);
        setPage(DEFAULT_PAGE);
    };

    const value = useMemo(() => ({
        requests,
        filters: { searchTerm, statuses },
        pagination: { page, perPage },
        setSearchTerm: handleSetSearchTerm,
        setStatuses: handleSetStatuses,
        setPage,
        setPerPage: handleSetPerPage,
    }), [requests, searchTerm, statuses, page, perPage]);

    return (
        <RequestsContext.Provider value={value}>
            {children}
        </RequestsContext.Provider>
    );
}

export function useRequests() {
    const context = useContext(RequestsContext);
    if (context === undefined) {
        throw new Error('useRequests must be used within a RequestsProvider');
    }
    return context;
}

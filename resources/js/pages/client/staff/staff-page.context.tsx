import { useDebounce } from '@/hooks/use-debounce.hook';
import { Paginate } from '@/types/app.type';
import { router } from '@inertiajs/react';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import Person from './types/person.type';
import StaffPageFilters from './types/staff-page-filters.type';

interface DeleteDialogState {
    isOpen: boolean;
    person: Person | null;
    isDeleting: boolean;
}

interface StaffContextProps {
    persons: Paginate<Person>;
    searchTerm: string;
    documentTypes: string[];
    page: number;
    perPage: number;
    handleSetSearchTerm: (term: string) => void;
    handleSetDocumentTypes: (documentTypes: string[]) => void;
    handleSetPage: (page: number) => void;
    handleSetPerPage: (perPage: number) => void;
    deleteDialog: DeleteDialogState;
    openDeleteDialog: (person: Person) => void;
    closeDeleteDialog: () => void;
    setDeleting: (isDeleting: boolean) => void;
}

const staffContext = createContext<StaffContextProps | undefined>(undefined);
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export function StaffPageProvider({
    persons,
    initialFilters,
    children,
}: PropsWithChildren<{
    persons: Paginate<Person>;
    initialFilters: StaffPageFilters;
}>) {
    const [searchTerm, setSearchTerm] = useState<string>(initialFilters.contains?.text ?? '');
    const [documentTypes, setDocumentTypes] = useState<string[]>(initialFilters.document_types ?? []);
    const [page, setPage] = useState<number>(DEFAULT_PAGE);
    const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);
    // Diálogo de eliminación
    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
        isOpen: false,
        person: null,
        isDeleting: false,
    });

    // Debounce para el searchTerm
    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    const handleSetSearchTerm = (term: string) => {
        setSearchTerm(term);
        setPage(DEFAULT_PAGE);
    };

    const handleSetDocumentTypes = (documentTypes: string[]) => {
        setDocumentTypes(documentTypes);
        setPage(DEFAULT_PAGE);
    };

    const handleSetPerPage = (perPage: number) => {
        setPerPage(perPage);
        setPage(DEFAULT_PAGE);
    };

    const handleSetPage = (page: number) => {
        setPage(page);
    };

    // Handlers para el diálogo de eliminación
    const openDeleteDialog = (person: Person) => {
        setDeleteDialog({ isOpen: true, person, isDeleting: false });
    };
    const closeDeleteDialog = () => {
        setDeleteDialog((prev) => ({ ...prev, isOpen: false, person: null, isDeleting: false }));
    };
    const setDeleting = (isDeleting: boolean) => {
        setDeleteDialog((prev) => ({ ...prev, isDeleting }));
    };

    // Efecto para sincronizar filtros, búsqueda y paginación con el backend
    useEffect(() => {
        const params = {} as StaffPageFilters;

        if (debouncedSearchTerm) {
            params.contains = {
                items: initialFilters.contains?.items || [],
                text: debouncedSearchTerm,
            };
        }

        if (documentTypes.length > 0) {
            params.document_types = documentTypes;
        }

        if (perPage !== DEFAULT_PER_PAGE) {
            params.per_page = perPage;
        }

        if (page !== DEFAULT_PAGE) {
            params.page = page;
        }

        router.get(location.pathname, params as unknown as FormData, {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }, [debouncedSearchTerm, documentTypes, page, perPage]);

    return (
        <staffContext.Provider
            value={{
                persons,
                searchTerm,
                handleSetSearchTerm,
                documentTypes,
                handleSetDocumentTypes,
                page,
                handleSetPage,
                perPage,
                handleSetPerPage,
                deleteDialog,
                openDeleteDialog,
                closeDeleteDialog,
                setDeleting,
            }}
        >
            {children}
        </staffContext.Provider>
    );
}

export function useStaffPage() {
    const context = useContext(staffContext);
    if (!context) {
        throw new Error('useStaffPage must be used within a StaffPageProvider');
    }
    return context;
}

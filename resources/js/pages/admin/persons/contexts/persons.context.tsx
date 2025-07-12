import PersonGender from '@/enums/person-gender.enum';
import { useDebounce } from '@/hooks/use-debounce.hook';
import { Paginate } from '@/types/app.type';
import { router } from '@inertiajs/react';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import Person from '../types/person.type';
import PersonsPageFilters from '../types/persons-page-filters.type';

interface DeleteDialogState {
    isOpen: boolean;
    person: Person | null;
    isDeleting: boolean;
}

interface PersonsContextProps {
    persons: Paginate<Person>;
    searchTerm: string;
    gender: PersonGender | null;
    documentTypes: number[];
    page: number;
    perPage: number;
    handleSetSearchTerm: (term: string) => void;
    handleSetGender: (gender: PersonGender | null) => void;
    handleSetDocumentTypes: (documentTypes: number[]) => void;
    handleSetPage: (page: number) => void;
    handleSetPerPage: (perPage: number) => void;
    deleteDialog: DeleteDialogState;
    openDeleteDialog: (person: Person) => void;
    closeDeleteDialog: () => void;
    setDeleting: (isDeleting: boolean) => void;
}

const PersonsContext = createContext<PersonsContextProps | undefined>(undefined);
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export function PersonsProvider({
    persons,
    initialFilters,
    children,
}: PropsWithChildren<{
    persons: Paginate<Person>;
    initialFilters: PersonsPageFilters;
}>) {
    const [searchTerm, setSearchTerm] = useState<string>(initialFilters.contains?.text ?? '');
    const [gender, setGender] = useState<PersonGender | null>(initialFilters.gender ?? null);
    const [documentTypes, setDocumentTypes] = useState<number[]>(initialFilters.document_types ?? []);
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

    const handleSetGender = (gender: PersonGender | null) => {
        setGender(gender);
        setPage(DEFAULT_PAGE);
    };

    const handleSetDocumentTypes = (documentTypes: number[]) => {
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
        const params = {} as PersonsPageFilters;

        if (debouncedSearchTerm) {
            params.contains = {
                items: ['first_name', 'middle_name', 'last_name_paternal', 'last_name_maternal', 'document_number', 'email'],
                text: debouncedSearchTerm,
            };
        }

        if (gender) {
            params.gender = gender;
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
    }, [debouncedSearchTerm, gender, documentTypes, page, perPage]);

    return (
        <PersonsContext.Provider
            value={{
                persons,
                searchTerm,
                handleSetSearchTerm,
                gender,
                handleSetGender,
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
        </PersonsContext.Provider>
    );
}

export function usePersons() {
    const context = useContext(PersonsContext);
    if (!context) {
        throw new Error('usePersons must be used within a PersonsProvider');
    }
    return context;
}

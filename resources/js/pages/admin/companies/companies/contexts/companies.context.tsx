import CompanyEntityType from '@/enums/company-entity-type';
import { useDebounce } from '@/hooks/use-debounce.hook';
import { Paginate } from '@/types/app.type';
import { router } from '@inertiajs/react';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import CompaniesPageFilters from '../types/companies-page-filters.type';
import Company from '../types/companies.type';

interface DeleteDialogState {
    isOpen: boolean;
    company: Company | null;
    isDeleting: boolean;
}

interface CompaniesContextProps {
    companies: Paginate<Company>;
    searchTerm: string;
    entityType: CompanyEntityType | null;
    documentTypes: number[];
    enabled: boolean | null;
    registeredViaForm: boolean | null;
    page: number;
    perPage: number;
    handleSetSearchTerm: (term: string) => void;
    handleSetEntityType: (entityType: CompanyEntityType | null) => void;
    handleSetDocumentTypes: (documentTypes: number[]) => void;
    handleSetEnabled: (enabled: boolean | null) => void;
    handleSetRegisteredViaForm: (registeredViaForm: boolean | null) => void;
    handleSetPage: (page: number) => void;
    handleSetPerPage: (perPage: number) => void;
    deleteDialog: DeleteDialogState;
    openDeleteDialog: (company: Company) => void;
    closeDeleteDialog: () => void;
    setDeleting: (isDeleting: boolean) => void;
}

const CompaniesContext = createContext<CompaniesContextProps | undefined>(undefined);
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export function CompaniesProvider({
    companies,
    initialFilters,
    children,
}: PropsWithChildren<{
    companies: Paginate<Company>;
    initialFilters: CompaniesPageFilters;
}>) {
    const [searchTerm, setSearchTerm] = useState<string>(initialFilters.contains?.text ?? '');
    const [entityType, setEntityType] = useState<CompanyEntityType | null>(initialFilters.entity_type ?? null);
    const [documentTypes, setDocumentTypes] = useState<number[]>(initialFilters.document_types ?? []);
    const [enabled, setEnabled] = useState<boolean | null>(initialFilters.enabled ?? null);
    const [registeredViaForm, setRegisteredViaForm] = useState<boolean | null>(initialFilters.registered_via_form ?? null);
    const [page, setPage] = useState<number>(DEFAULT_PAGE);
    const [perPage, setPerPage] = useState<number>(DEFAULT_PER_PAGE);
    // Diálogo de eliminación
    const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
        isOpen: false,
        company: null,
        isDeleting: false,
    });

    // Debounce para el searchTerm
    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    const handleSetSearchTerm = (term: string) => {
        setSearchTerm(term);
        setPage(DEFAULT_PAGE);
    };

    const handleSetEntityType = (entityType: CompanyEntityType | null) => {
        setEntityType(entityType);
        setPage(DEFAULT_PAGE);
    };

    const handleSetDocumentTypes = (documentTypes: number[]) => {
        setDocumentTypes(documentTypes);
        setPage(DEFAULT_PAGE);
    };

    const handleSetEnabled = (enabled: boolean | null) => {
        setEnabled(enabled);
        setPage(DEFAULT_PAGE);
    };

    const handleSetRegisteredViaForm = (registeredViaForm: boolean | null) => {
        setRegisteredViaForm(registeredViaForm);
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
    const openDeleteDialog = (company: Company) => {
        setDeleteDialog({ isOpen: true, company, isDeleting: false });
    };
    const closeDeleteDialog = () => {
        setDeleteDialog((prev) => ({ ...prev, isOpen: false, company: null, isDeleting: false }));
    };
    const setDeleting = (isDeleting: boolean) => {
        setDeleteDialog((prev) => ({ ...prev, isDeleting }));
    };

    // Efecto para sincronizar filtros, búsqueda y paginación con el backend
    useEffect(() => {
        const params = {} as CompaniesPageFilters;

        if (debouncedSearchTerm) {
            params.contains = { items: ['business_name', 'document_number'], text: debouncedSearchTerm };
        }

        if (entityType) {
            params.entity_type = entityType;
        }
        if (documentTypes.length > 0) {
            params.document_types = documentTypes;
        }
        if (enabled !== null) {
            params.enabled = enabled;
        }
        if (registeredViaForm !== null) {
            params.registered_via_form = registeredViaForm;
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
    }, [debouncedSearchTerm, entityType, documentTypes, enabled, registeredViaForm, page, perPage]);

    return (
        <CompaniesContext.Provider
            value={{
                companies,
                searchTerm,
                handleSetSearchTerm,
                entityType,
                handleSetEntityType,
                documentTypes,
                handleSetDocumentTypes,
                enabled,
                handleSetEnabled,
                registeredViaForm,
                handleSetRegisteredViaForm,
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
        </CompaniesContext.Provider>
    );
}

export function useCompanies() {
    const context = useContext(CompaniesContext);
    if (!context) {
        throw new Error('useCompanies must be used within a CompaniesProvider');
    }
    return context;
}

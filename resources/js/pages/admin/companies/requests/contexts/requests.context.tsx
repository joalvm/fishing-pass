import { useDebounce } from '@/hooks/use-debounce.hook';
import { Filter, Paginate } from '@/types/app.type';
import { router } from '@inertiajs/react';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import RegistrationStatus from '../enums/registration-status.enum';
import RegistrationRequest from '../types/registration-request.type';

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
    // Diálogos
    dialogs: {
        rejection: {
            isOpen: boolean;
            request: RegistrationRequest | null;
            open: (request: RegistrationRequest) => void;
            close: () => void;
        };
        approval: {
            isOpen: boolean;
            request: RegistrationRequest | null;
            notifyByEmail: boolean;
            open: (request: RegistrationRequest) => void;
            close: () => void;
            setNotifyByEmail: (notify: boolean) => void;
        };
        deleteConfirmation: {
            isOpen: boolean;
            request: RegistrationRequest | null;
            open: (request: RegistrationRequest) => void;
            close: () => void;
            isDeleting: boolean;
        };
    };
    setSearchTerm: (term: string) => void;
    setStatuses: (statuses: RegistrationStatus[]) => void;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);
const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 10;

export function RequestsProvider({
    children,
    initialRequests,
    initialFilters,
}: PropsWithChildren<{
    initialRequests: Paginate<RegistrationRequest>;
    initialFilters: Filter<RegistrationRequest>;
}>) {
    const [requests, setRequests] = useState(initialRequests);
    const [searchTerm, setSearchTerm] = useState(initialFilters.contains?.text ?? '');
    const [statuses, setStatuses] = useState(Array.isArray(initialFilters.statuses) ? initialFilters.statuses : []);
    const [page, setPage] = useState(initialFilters.page ?? DEFAULT_PAGE);
    const [perPage, setPerPage] = useState(initialFilters.perPage ?? DEFAULT_PER_PAGE);

    // Estados para los diálogos
    const [rejectionDialog, setRejectionDialog] = useState<{
        isOpen: boolean;
        request: RegistrationRequest | null;
    }>({
        isOpen: false,
        request: null,
    });

    const [approvalDialog, setApprovalDialog] = useState<{
        isOpen: boolean;
        request: RegistrationRequest | null;
        notifyByEmail: boolean;
    }>({
        isOpen: false,
        request: null,
        notifyByEmail: true,
    });

    const [deleteDialog, setDeleteDialog] = useState<{
        isOpen: boolean;
        request: RegistrationRequest | null;
        isDeleting: boolean;
    }>({
        isOpen: false,
        request: null,
        isDeleting: false,
    });

    // Controladores para el diálogo de rechazo
    const openRejectionDialog = (request: RegistrationRequest) => {
        setRejectionDialog({ isOpen: true, request });
    };

    const closeRejectionDialog = () => {
        setRejectionDialog({ isOpen: false, request: null });
    };

    // Controladores para el diálogo de aprobación
    const openApprovalDialog = (request: RegistrationRequest) => {
        setApprovalDialog({ isOpen: true, request, notifyByEmail: true });
    };

    const closeApprovalDialog = () => {
        setApprovalDialog({ isOpen: false, request: null, notifyByEmail: true });
    };

    const setNotifyByEmail = (notify: boolean) => {
        setApprovalDialog((prev) => ({ ...prev, notifyByEmail: notify }));
    };

    // Controladores para el diálogo de confirmación de eliminación
    const openDeleteDialog = (request: RegistrationRequest) => {
        setDeleteDialog({ isOpen: true, request, isDeleting: false });
    };

    const closeDeleteDialog = () => {
        setDeleteDialog((prev) => ({ ...prev, isOpen: false, isDeleting: false }));
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        setRequests(initialRequests);
    }, [initialRequests]);

    useEffect(() => {
        const params = {} as Filter<RegistrationRequest>;

        if (debouncedSearchTerm) {
            params.contains = { items: ['business_name', 'document_number'], text: debouncedSearchTerm };
        }

        if (statuses.length > 0) {
            params.statuses = statuses;
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

    const value = useMemo(
        () => ({
            requests,
            filters: { searchTerm, statuses },
            pagination: { page, perPage },
            dialogs: {
                rejection: {
                    ...rejectionDialog,
                    open: openRejectionDialog,
                    close: closeRejectionDialog,
                },
                approval: {
                    ...approvalDialog,
                    open: openApprovalDialog,
                    close: closeApprovalDialog,
                    setNotifyByEmail,
                },
                deleteConfirmation: {
                    ...deleteDialog,
                    open: openDeleteDialog,
                    close: closeDeleteDialog,
                    isDeleting: deleteDialog.isDeleting,
                },
            },
            setSearchTerm: handleSetSearchTerm,
            setStatuses: handleSetStatuses,
            setPage,
            setPerPage: handleSetPerPage,
        }),
        [requests, searchTerm, statuses, page, perPage, rejectionDialog, approvalDialog, deleteDialog],
    );

    return <RequestsContext.Provider value={value}>{children}</RequestsContext.Provider>;
}

export function useRequests() {
    const context = useContext(RequestsContext);
    if (context === undefined) {
        throw new Error('useRequests must be used within a RequestsProvider');
    }
    return context;
}

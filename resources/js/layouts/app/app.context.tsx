import AuthType from '@/enums/auth-type.enum';
import { PageProps } from '@/types/app.type';
import { Company, Person, User } from '@/types/auth.type';
import { usePage } from '@inertiajs/react';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface AppContextProps {
    authType: AuthType;
    user: User;
    person: Person;
    company: Company | null;
    sidebarOpen: boolean;
    getInitials: () => string;
    toggleSidebar: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const SIDEBAR_STORAGE_KEY = 'dashboard_sidebar_open';

export function AppProvider({ children }: PropsWithChildren) {
    const { auth } = usePage<PageProps>().props;
    const [sidebarOpen, setSidebarOpenState] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
            return stored ? stored === 'true' : true;
        }
        return true;
    });

    useEffect(() => {
        localStorage.setItem(SIDEBAR_STORAGE_KEY, String(sidebarOpen));
    }, [sidebarOpen]);

    const toggleSidebar = () => setSidebarOpenState((prev) => !prev);

    const getInitials = useCallback((): string => {
        const names = (auth.person.first_name + ' ' + auth.person.last_name_paternal).trim().split(' ');

        if (names.length === 0) return '';
        if (names.length === 1) return names[0].charAt(0).toUpperCase();

        const firstInitial = names[0].charAt(0);
        const lastInitial = names[names.length - 1].charAt(0);

        return `${firstInitial}${lastInitial}`.toUpperCase();
    }, []);

    const value = useMemo(
        () => ({
            user: auth.user,
            person: auth.person,
            company: auth.company,
            authType: auth.type,
            sidebarOpen,
            getInitials,
            toggleSidebar,
        }),
        [auth, sidebarOpen, toggleSidebar],
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useDashboard debe usarse dentro de AppProvider');
    }
    return context;
}

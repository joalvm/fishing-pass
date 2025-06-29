import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function DashboardPage(props: PropsWithChildren) {
    const handleLogout = () => {
        router.delete(route('logout'), {
            replace: true,
        });
    };

    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="mb-4 text-4xl font-bold">Dashboard</h1>
            <p className="text-lg">Welcome to the dashboard!</p>
            <p className="mt-2 text-sm text-gray-500">This is a placeholder for the dashboard content.</p>
            <Button type="button" onClick={handleLogout} className="mt-6">
                Cerrar sesión
            </Button>
            <pre>{JSON.stringify(props, null, 2)}</pre>
        </div>
    );
}

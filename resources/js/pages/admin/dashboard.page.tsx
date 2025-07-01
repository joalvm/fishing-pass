import AppLayout from '@/layouts/app/app.layout';
import { router } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function DashboardPage(props: PropsWithChildren) {
    const handleLogout = () => {
        router.delete(route('logout'), {
            replace: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Dashboard', href: route('admin.dashboard') }]}>
            <div className="flex h-full flex-col items-center justify-center">
                <h1 className="mb-4 text-2xl font-bold">Welcome to the Admin Dashboard</h1>
                <p className="mb-6 text-gray-600">Manage your application settings and user accounts.</p>
                <button onClick={handleLogout} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                    Logout
                </button>
            </div>
            {props.children}
        </AppLayout>
    );
}

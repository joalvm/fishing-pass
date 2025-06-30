import { Button } from '@/components/ui/button';
import Dashboard from '@/layouts/dashboard/dashboard.layout';
import { router } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function DashboardPage(props: PropsWithChildren) {
    const handleLogout = () => {
        router.delete(route('logout'), {
            replace: true,
        });
    };

    return (
        <Dashboard breadcrumbs={[{ title: 'Dashboard', href: route('admin.dashboard') }]}>
            <div className="flex h-full flex-col items-center justify-center">
                <h1 className="mb-4 text-2xl font-bold">Welcome to the Dashboard</h1>
                <p className="mb-6">This is your dashboard where you can manage your application.</p>
                <Button onClick={handleLogout} variant="destructive">
                    Logout
                </Button>
            </div>
        </Dashboard>
    );
}

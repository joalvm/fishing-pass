import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Heading from '@/layouts/app/components/heading.component';
import { ClipboardListIcon, TrendingUpIcon, TruckIcon, UsersIcon } from 'lucide-react';
import AdminLayout from '../admin.layout';
import Content from '@/layouts/app/components/content.component';

const breadcrumbs = [{ title: 'Panel de control', href: route('admin.dashboard') }];

const stats = [
    {
        title: 'Clientes Activos',
        value: '24',
        change: '+2 este mes',
        icon: UsersIcon,
        color: 'text-blue-600',
    },
    {
        title: 'Solicitudes Pendientes',
        value: '8',
        change: '3 urgentes',
        icon: ClipboardListIcon,
        color: 'text-orange-600',
    },
    {
        title: 'Vehículos en Planta',
        value: '12',
        change: '5 cargando',
        icon: TruckIcon,
        color: 'text-green-600',
    },
    {
        title: 'Accesos Hoy',
        value: '47',
        change: '+12% vs ayer',
        icon: TrendingUpIcon,
        color: 'text-purple-600',
    },
];

export default function DashboardPage() {
    return (
        <AdminLayout breadcrumbs={breadcrumbs} title="Panel de control">
            <Content size="full">
                <Heading title="Panel de control" description="Resumen general de operaciones" />
                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={index}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                                    <Icon className={`h-5 w-5 ${stat.color}`} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <p className="mt-1 text-xs text-gray-500">{stat.change}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </Content>
        </AdminLayout>
    );
}

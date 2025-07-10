import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BanIcon, CheckCircle2Icon, FileTextIcon, UsersIcon } from 'lucide-react';

interface StatsCardsProps {
    total: number;
    active: number;
    inactive: number;
    registeredViaForm: number;
}

export default function StatsCards({ total, active, inactive, registeredViaForm }: StatsCardsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="flex-1/4 gap-2 py-4 shadow-none">
                <CardHeader className="flex flex-row items-center justify-between px-4">
                    <CardTitle className="text-sm font-medium">Total</CardTitle>
                    <UsersIcon className="h-4 w-4 text-gray-500" />
                </CardHeader>
                <CardContent className="px-4">
                    <div className="text-2xl font-bold" title={`Total empresas: ${total}`}>
                        {total}
                    </div>
                </CardContent>
            </Card>
            <Card className="flex-1/4 gap-2 py-4 shadow-none">
                <CardHeader className="flex flex-row items-center justify-between px-4">
                    <CardTitle className="text-sm font-medium">Activas</CardTitle>
                    <CheckCircle2Icon className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent className="px-4">
                    <div className="text-2xl font-bold text-green-700" title={`Empresas activas: ${active}`}>
                        {active}
                    </div>
                </CardContent>
            </Card>
            <Card className="flex-1/4 gap-2 py-4 shadow-none">
                <CardHeader className="flex flex-row items-center justify-between px-4">
                    <CardTitle className="text-sm font-medium">Inactivas</CardTitle>
                    <BanIcon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent className="px-4">
                    <div className="text-2xl font-bold text-gray-500" title={`Empresas inactivas: ${inactive}`}>
                        {inactive}
                    </div>
                </CardContent>
            </Card>
            <Card className="flex-1/4 gap-2 py-4 shadow-none">
                <CardHeader className="flex flex-row items-center justify-between px-4">
                    <CardTitle className="text-sm font-medium">Registradas vía formulario</CardTitle>
                    <FileTextIcon className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent className="px-4">
                    <div className="text-2xl font-bold text-blue-700" title={`Registradas vía formulario: ${registeredViaForm}`}>
                        {registeredViaForm}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

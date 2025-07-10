import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClockFadingIcon } from 'lucide-react';
import Stats from '../../types/stats.type';

type PendingRequestsProps = {
    stats: Stats;
};

export default function PendingRequests({ stats }: PendingRequestsProps) {
    return (
        <Card className="flex-1/4 gap-2 py-4 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between px-4">
                <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
                <ClockFadingIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent className="px-4">
                <div className="text-2xl font-bold" title={`pendientes: ${stats.pending}`}>
                    {stats.pending}
                </div>
            </CardContent>
        </Card>
    );
}

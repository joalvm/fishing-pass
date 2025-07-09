import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Stats from "../../types/stats.type";
import { ClockFadingIcon } from "lucide-react";

type RejectedRequestsProps = {
    stats: Stats;
};

export default function RejectedRequests({ stats }: RejectedRequestsProps) {
    return (
        <Card className="shadow-none gap-2 py-4 flex-1/4">
            <CardHeader className="flex flex-row items-center justify-between px-4">
                <CardTitle className="text-sm font-medium">Rechazados</CardTitle>
                <ClockFadingIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent className="px-4">
                <div className="text-2xl font-bold" title={`rechazados: ${stats.rejected}`}>
                    {stats.rejected}
                </div>
            </CardContent>
        </Card>
    );
}

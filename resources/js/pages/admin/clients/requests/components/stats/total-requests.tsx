import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockFadingIcon } from "lucide-react";

export default function TotalRequests() {
    return (
        <Card className="shadow-none gap-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total</CardTitle>
                <ClockFadingIcon className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold" title={`total: 10`}>
                    10
                </div>
                <p className="text-xs text-gray-500">
                    ({Math.round((10 / 10) * 100)}% del total)
                </p>
            </CardContent>
        </Card>
    );
}

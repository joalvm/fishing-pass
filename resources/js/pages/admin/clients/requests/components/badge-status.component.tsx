import { cva, VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import RegistrationStatus, { RegistrationStatusLabel } from "../enums/registration-status.enum";

const badgeVariants = cva(
    'text-[0.65rem] capitalize',
    {
        variants: {
            status: {
                [RegistrationStatus.PENDING]: 'bg-blue-400/10 border-transparent text-blue-600 dark:text-blue-400',
                [RegistrationStatus.APPROVED]: 'bg-green-400/10 border-transparent text-green-600 dark:text-green-400',
                [RegistrationStatus.REJECTED]: 'bg-red-400/10 border-transparent text-red-600 dark:text-red-400',
            },
        },
        defaultVariants: {
            status: RegistrationStatus.PENDING,
        },
    }
);

type BadgeStatusProps = ComponentProps<typeof Badge> & VariantProps<typeof badgeVariants> & {
    status: RegistrationStatus;
}

export default function BadgeStatus({ className, status, ...props }: BadgeStatusProps) {
    return (
        <Badge variant="outline" data-status={status} className={cn(className,badgeVariants({ status }))} {...props}>
            {RegistrationStatusLabel(status)}
        </Badge>
    )
}

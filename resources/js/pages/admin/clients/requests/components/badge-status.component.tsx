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
                [RegistrationStatus.PENDING]: 'bg-green-500/5 border-green-500/30 text-green-500',
                [RegistrationStatus.APPROVED]: 'bg-green-500/5 border-green-500/30 text-green-500',
                [RegistrationStatus.REJECTED]: 'bg-red-500/5 border-red-500/30 text-red-500',
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

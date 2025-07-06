import { cva, VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import RegistrationStatus from "@/enums/registration-status.enum";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

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
    const label = (status: RegistrationStatus) => {
        switch (status) {
            case RegistrationStatus.PENDING:
                return 'Pendiente';
            case RegistrationStatus.APPROVED:
                return 'Aprobado';
            case RegistrationStatus.REJECTED:
                return 'Rechazado';
            default:
                return 'Desconocido';
        }
    }

    return (
        <Badge variant="outline" data-status={status} className={cn(className,badgeVariants({ status }))} {...props}>
            {label(status)}
        </Badge>
    )
}

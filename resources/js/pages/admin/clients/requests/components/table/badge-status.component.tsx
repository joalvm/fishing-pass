import { cva, VariantProps } from "class-variance-authority";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import RegistrationStatus, { RegistrationStatusLabel } from "../../enums/registration-status.enum";
import { CheckIcon, CheckCheckIcon, XIcon } from 'lucide-react';

const badgeVariants = cva(
    'text-[0.65rem] capitalize leading-none line-height-none py-1 pl-5 pr-1 relative',
    {
        variants: {
            status: {
                [RegistrationStatus.PENDING]: 'bg-gray-400/10 border-transparent text-gray-600 dark:text-gray-400',
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
    const renderIcon = () => {
        const iconProps = { className: 'h-3 w-3 absolute left-1 -translate-y-1/2 top-1/2' };
        switch (status) {
            case RegistrationStatus.PENDING:
                return <CheckIcon {...iconProps} className={cn(iconProps.className, 'text-gray-500 dark:text-gray-400')} />;
            case RegistrationStatus.APPROVED:
                return <CheckCheckIcon {...iconProps} />;
            case RegistrationStatus.REJECTED:
                return <XIcon {...iconProps} />;
            default:
                return null;
        }
    };

    return (
        <Badge variant="outline" data-status={status} className={cn(className, badgeVariants({ status }))} title={RegistrationStatusLabel(status)} {...props}>
            {renderIcon()}
            {RegistrationStatusLabel(status)}
        </Badge>
    );
}

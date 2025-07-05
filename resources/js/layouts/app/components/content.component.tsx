import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const contentVariants = cva('flex-1 overflow-auto w-full mx-auto p-4 h-full', {
    variants: {
        size: {
            full: 'max-w-full',
            lg: 'max-w-7xl',
        },
    },
    defaultVariants: {
        size: 'lg',
    },
});

type ContentProps = ComponentProps<'div'> &
    VariantProps<typeof contentVariants> & {
        size: 'full' | 'lg';
    };

export default function Content({ className, children, size }: ContentProps) {
    return (
        <div className={cn(contentVariants({ size, className }))} data-slot="content">
            {children}
        </div>
    );
}

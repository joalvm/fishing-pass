import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const contentVariants = cva('flex flex-col overflow-auto w-full mx-auto p-4 h-full gap-6', {
    variants: {
        size: {
            full: 'max-w-full',
            lg: 'max-w-2xl',
            xl: 'max-w-4xl',
            xxl: 'max-w-7xl',
        },
    },
    defaultVariants: {
        size: 'xxl',
    },
});

type ContentProps = ComponentProps<'div'> &
    VariantProps<typeof contentVariants> & {
        size: 'full' | 'lg' | 'xl' | 'xxl';
    };

export default function Content({ className, children, size }: ContentProps) {
    return (
        <div className={cn(contentVariants({ size, className }))} data-slot="content">
            {children}
        </div>
    );
}

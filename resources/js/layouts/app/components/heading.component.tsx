import { cva, VariantProps } from 'class-variance-authority';
import { ComponentProps } from 'react';

const headingVariants = cva('flex flex-col gap-4 md:flex-row md:items-center md:justify-between', {
    variants: {
        size: {
            small: 'mb-0.5',
            default: 'mb-1',
        },
    },
    defaultVariants: {
        size: 'default',
    },
});

type HeadingProps = ComponentProps<'header'> &
    VariantProps<typeof headingVariants> & {
        title: string;
        description?: string;
        size?: 'small' | 'default';
    };

export default function Heading({ className, children, title, description, size = 'default' }: HeadingProps) {
    return (
        <header className={headingVariants({ size, className })} data-slot="heading">
            <div className="flex-1 space-y-0.5">
                {size === 'small' ? (
                    <h2 className="text-base font-medium">{title}</h2>
                ) : (
                    <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
                )}
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </div>
            {children && <div>{children}</div>}
        </header>
    );
}

export interface HeadingProps {
    title: string;
    description?: string;
    size?: 'small' | 'default';
}

export default function Heading({ title, description, size = 'default' }: HeadingProps) {
    if (size === 'small') {
        return (
            <header>
                <h3 className="mb-0.5 text-base font-medium">{title}</h3>
                {description && <p className="text-sm text-muted-foreground">{description}</p>}
            </header>
        );
    }

    return (
        <div className="mb-8 space-y-0.5">
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
    );
}

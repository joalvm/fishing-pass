import { ComponentProps } from 'react';

export default function Content({ children, ...props }: ComponentProps<'main'>) {
    // return <SidebarInset {...props}>{children}</SidebarInset>;

    return (
        <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col" {...props}>
            {children}
        </main>
    );
}

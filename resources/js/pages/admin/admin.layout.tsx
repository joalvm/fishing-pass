import AppLayout, { AppLayoutProps } from '@/layouts/app/app.layout';
import navigation from './navigation';

type AdminLayoutProps = Omit<AppLayoutProps, 'navigation'>;

export default function AdminLayout({ children }: AdminLayoutProps) {
    return <AppLayout navigation={navigation}>{children}</AppLayout>;
}

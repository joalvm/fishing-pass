import AppLayout, { AppLayoutProps } from '@/layouts/app/app.layout';
import navigation from './navigation';

type ClientLayoutProps = Omit<AppLayoutProps, 'navigation'>;

export default function ClientLayout({ children }: ClientLayoutProps) {
    return <AppLayout navigation={navigation}>{children}</AppLayout>;
}

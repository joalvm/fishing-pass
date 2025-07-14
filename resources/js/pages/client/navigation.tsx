import { NavItem } from '@/types/app.type';
import { LayoutGridIcon } from 'lucide-react';

const navigation: NavItem[] = [
    {
        type: 'item',
        title: 'Panel de control',
        href: route('client.dashboard'),
        icon: LayoutGridIcon,
    },
];

export default navigation;

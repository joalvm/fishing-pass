import { NavItem } from '@/types/app.type';
import { Building2Icon, LayoutGridIcon } from 'lucide-react';

const navigation: NavItem[] = [
    {
        type: 'item',
        title: 'Panel de control',
        href: route('admin.dashboard'),
        icon: LayoutGridIcon,
    },
    {
        type: 'group',
        title: 'Empresas',
        icon: Building2Icon,
        items: [
            {
                type: 'item',
                title: 'Lista de empresas',
                href: route('admin.companies.index'),
            },
            {
                type: 'item',
                title: 'Solicitudes de registro',
                href: route('admin.companies.requests.index'),
            },
        ],
    },
];

export default navigation;

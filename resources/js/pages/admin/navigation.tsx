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
        title: 'Clientes',
        icon: Building2Icon,
        items: [
            {
                type: 'item',
                title: 'Lista de clientes',
                href: route('admin.clients.index'),
            },
            {
                type: 'item',
                title: 'Solicitudes de registro',
                href: route('admin.clients.requests.index'),
            },
        ],
    },
];

export default navigation;

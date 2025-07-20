import { NavItem } from '@/types/app.type';
import { DoorOpenIcon, LayoutGridIcon, Users2Icon } from 'lucide-react';

const navigation: NavItem[] = [
    {
        type: 'item',
        title: 'Panel de control',
        href: route('client.dashboard'),
        icon: LayoutGridIcon,
    },
    {
        type: 'item',
        title: 'Personal',
        href: route('client.staff.index'),
        icon: Users2Icon,
    },
    {
        type: 'item',
        title: 'Solicitudes de Acceso',
        href: route('client.access-requests.index'),
        icon: DoorOpenIcon,
    },
];

export default navigation;

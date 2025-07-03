import { type LucideIcon } from 'lucide-react';
import { Auth } from './auth.type';

export interface SharedData {
    name: string;
    auth: Auth;
    [key: string]: unknown;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export type NavItem = {
    type: 'item';
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
} | {
    type: 'group';
    title: string;
    href?: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    items: NavItem[];
}

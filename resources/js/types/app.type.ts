import { type LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { Auth } from './auth.type';
import { Flatten } from './flatten.type';

export interface PageProps {
    name: string;
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export type Filter<T> = {
    page?: number;
    perPage?: number;
    sort?: Sort<T>;
    contains?: {
        items: Flatten<T>[];
        text: string;
    };
    [key: string]: unknown;
};

export type Sort<T> = Partial<{ [K in Flatten<T>]: 'asc' | 'desc' }>;

export type Paginate<T> = {
    data: T[];
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        per_page: number;
        to: number | null;
        total: number;
    };
};

export interface BreadcrumbItem {
    title: string;
    href?: string;
}

export type NavItem =
    | {
          type: 'item';
          title: string;
          href: string;
          icon?: LucideIcon | null;
          isActive?: boolean;
      }
    | {
          type: 'group';
          title: string;
          href?: string;
          icon?: LucideIcon | null;
          isActive?: boolean;
          items: NavItem[];
      };

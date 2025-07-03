import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem } from '@/components/ui/sidebar';
import { NavItem } from '@/types/app.type';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';

type NavMainGroupProps = {
    item: NavItem & { type: 'group' };
};

function NavMainItem({ item }: { item: NavItem }) {
    const page = usePage();
    const href = item?.href || '#';
    // Quitarle el dominio al href
    const path = href.startsWith('http') ? new URL(href).pathname : href;

    return (
        <SidebarMenuButton asChild isActive={page.url.startsWith(path)} tooltip={{ children: item.title }}>
            <Link href={item.href || '#'} prefetch>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
            </Link>
        </SidebarMenuButton>
    );
}

function pathname(href: string | undefined) {
    if (!href) return '';
    return href.startsWith('http') ? new URL(href).pathname : href;
}

function isPage(pageUrl: string, hrefs: (string | undefined)[]) {
    return hrefs.filter((href) => href !== undefined).some((href) => pageUrl.startsWith(pathname(href)));
}

function NavMainGroup({ item }: NavMainGroupProps) {
    const page = usePage();
    const hrefs = [item.href, ...item.items.map((subItem) => subItem.href)];

    const [open, setOpen] = useState(isPage(page.url, hrefs));

    return (
        <SidebarMenu>
            <Collapsible open={open} className="group/collapsible" onOpenChange={(isOpen) => setOpen(isOpen)}>
                <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                            {item.icon && <item.icon />}
                            {item.title}
                            <ChevronDownIcon className="ml-auto size-4 opacity-50 transition group-data-[state=open]/collapsible:rotate-180 group-data-[state=open]/collapsible:opacity-100" />
                        </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub>
                            {item.items.map((subItem) => (
                                <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuSubButton asChild isActive={page.url === pathname(subItem.href)}>
                                        <Link href={subItem.href || '#'} prefetch>
                                            {subItem.icon && <subItem.icon />}
                                            <span>{subItem.title}</span>
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuItem>
            </Collapsible>
        </SidebarMenu>
    );
}

export function NavMain({ items = [] }: { items: NavItem[] }) {
    return (
        <SidebarMenu>
            {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                    {item.type === 'item' ? <NavMainItem item={item} /> : <NavMainGroup item={item} />}
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
    );
}

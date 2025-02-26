'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { useState } from 'react';

type Breadcrumb = {
  label: string;
  url: string;
};

type MenuItem = {
  title: string;
  url: string;
  breadcrumb: Breadcrumb[];
  items?: MenuItem[];
  icon?: LucideIcon;
};
export function NavMain({
  menuItems,
  setBreadCrumbData,
}: {
  menuItems: MenuItem[];
  setBreadCrumbData: React.Dispatch<React.SetStateAction<Breadcrumb[]>>;
}) {
  const t = useTranslations('SideMenu');

  // Handle item click to set the active state
  const handleItemClick = (item: MenuItem) => {
    setBreadCrumbData(item.breadcrumb);
  };
  const paths = usePathname();

  const getTemporaryData = () => {
    const data = sessionStorage.getItem('isNewUser');
    return data ? JSON.parse(data) : true;
  };
  return (
    <SidebarGroup>
      <SidebarMenu>
        {menuItems.map((item) =>
          item.items != null ? (
            <SidebarMenuItem key={item.title}>
              <Collapsible>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{t(item.title)}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </Collapsible>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                onClick={() => handleItemClick(item)}
                isActive={
                  item.url == '/admin'
                    ? paths == item.url
                      ? true
                      : false
                    : paths.includes(item.url)
                    ? true
                    : false
                  // paths == item.url ||
                  // (paths != item.url && paths.includes(item.url))
                  //   ? true
                  //   : false
                }
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  {t(item.title)}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ),
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

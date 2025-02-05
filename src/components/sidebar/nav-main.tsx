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

  const paths = usePathname();

  const [activeItem, setActiveItem] = useState<string | null>(null);
  // Handle item click to set the active state
  const handleItemClick = (item: MenuItem) => {
    setActiveItem((prev) => (prev === item.title ? null : item.title));
    setBreadCrumbData(item.breadcrumb);
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
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          onClick={() => handleItemClick(subItem)}
                          className={
                            paths === subItem.url
                              ? 'active'
                              : '' +
                                'hover:bg-gray-50 active:bg-gray-50 focus:outline-none'
                          }
                        >
                          <Link href={subItem.url}>{t(subItem.title)}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                onClick={() => handleItemClick(item)}
                isActive={true}
                className={
                  paths === item.url
                    ? 'active'
                    : '' +
                      'hover:bg-gray-50 active:bg-gray-50 focus:outline-none'
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

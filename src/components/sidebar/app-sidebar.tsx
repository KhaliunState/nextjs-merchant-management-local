'use client';

import * as React from 'react';
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  StoreIcon,
  SettingsIcon,
  EarthIcon,
  ArrowLeftRightIcon,
  FileTextIcon,
  UsersRoundIcon,
  LayoutDashboardIcon,
  type LucideIcon,
} from 'lucide-react';
import { NavUser } from '@/components/sidebar/nav-user';
import { TeamSwitcher } from '@/components/sidebar/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { NavMain } from '@/components/sidebar/nav-main';
import { useTranslations } from 'next-intl';
import { Separator } from '@radix-ui/react-separator';
import DynamicBreadcrumb from '../dinamic-breadcrumb';
interface Breadcrumb {
  label: string;
  url: string;
}

interface MenuItem {
  title: string;
  url: string;
  breadcrumb: Breadcrumb[];
  items?: MenuItem[];
  icon?: LucideIcon;
}
export function AppSidebar({
  children,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  children: React.ReactNode;
}) {
  const t = useTranslations('SideMenu');
  const client = useTranslations('Client');
  const site = useTranslations('Site');

  const menuItems: MenuItem[] = [
    {
      title: 'dashboard',
      url: '/admin',
      breadcrumb: [
        {
          label: 'home',
          url: '/admin',
        },
        {
          label: 'dashboard',
          url: '/admin',
        },
      ],
      icon: LayoutDashboardIcon,
    },
    {
      title: 'client_management',
      url: '/admin/clients',
      breadcrumb: [
        {
          label: 'home',
          url: '/admin',
        },
        {
          label: 'client_management',
          url: '/admin/clients',
        },
      ],
      icon: StoreIcon,
    },

    {
      title: 'site_management',
      url: '/admin/sites',
      breadcrumb: [
        {
          label: 'home',
          url: '/admin',
        },
        {
          label: 'site_management',
          url: '/sites',
        },
      ],
      icon: EarthIcon,
    },
    {
      title: 'service_management',
      url: '/admin/services',
      breadcrumb: [
        {
          label: 'home',
          url: '/admin',
        },
        {
          label: 'service_management',
          url: '/admin/services',
        },
      ],
      icon: SettingsIcon,
    },
    {
      title: 'transaction_management',
      url: '/admin/transactions',
      breadcrumb: [
        {
          label: 'home',
          url: '/admin',
        },
        {
          label: 'transaction_management',
          url: '/admin/transactions',
        },
      ],
      icon: ArrowLeftRightIcon,
    },
    {
      title: 'invoice_management',
      url: '/admin/invoices',
      breadcrumb: [
        {
          label: 'home',
          url: '/admin',
        },
        {
          label: 'invoice_management',
          url: '/admin/invoices',
        },
      ],
      icon: FileTextIcon,
    },
    {
      title: 'user_management',
      url: '/admin/users',
      breadcrumb: [
        {
          label: 'home',
          url: '/admin',
        },
        {
          label: 'user_management',
          url: '/admin/users',
        },
      ],
      icon: UsersRoundIcon,
    },
  ];
  type Breadcrumb = {
    label: string;
    url: string;
  };
  const data = {
    user: {
      name: 'shadcn',
      email: 'm@example.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'IFP加盟店管理システム',
        logo: GalleryVerticalEnd,
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup',
      },
      {
        name: 'Evil Corp.',
        logo: Command,
        plan: 'Free',
      },
    ],
  };
  const [breadCrumbData, setBreadCrumbData] = React.useState<Breadcrumb[]>([]);
  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher teams={data.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain
            menuItems={menuItems}
            setBreadCrumbData={setBreadCrumbData}
          />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb data={breadCrumbData} />
        </header>
        <main className="w-full p-8">{children}</main>
      </SidebarInset>
    </>
  );
}

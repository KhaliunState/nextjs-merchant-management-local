import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  StoreIcon,
  EarthIcon,
  ArrowLeftRightIcon,
  FileTextIcon,
  UsersRoundIcon,
  LayoutDashboardIcon,
} from 'lucide-react';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import './globals.css';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import DynamicBreadcrumb from '@/components/dinamic-breadcrumb';
import { useState } from 'react';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  const breadcrumbData = ['home', 'dashboard'];
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SidebarProvider>
            <AppSidebar children={children} />
          </SidebarProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

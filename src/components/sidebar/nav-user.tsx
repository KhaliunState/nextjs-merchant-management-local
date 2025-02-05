'use client';

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  LucideAperture,
  LucideLanguages,
  LucideSettings,
  Sparkles,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SelectLanguage } from '@/components/select-language';
import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useState } from 'react';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const t = useTranslations('User');
  const smenu = useTranslations('SideMenu');
  const btn = useTranslations('Buttons');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isEditedDialogOpen, setIsEditedDialogOpen] = useState(false);

  function handleUpdate() {
    setIsEditDialogOpen(false);
    setIsEditedDialogOpen(true);
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <LucideLanguages />
                Language
                <SelectLanguage></SelectLanguage>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <LucideSettings />
                {t('change_password')}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <Link href="/auth/login">{smenu('log_out')}</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('change_password')}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="name" className="text-right col-span-2">
                  {t('current_password')}
                </Label>
                <Input id="current_password" className="col-span-3" />
              </div>
              {/* Access Log */}
              <div className="grid grid-cols-5 items-center gap-4">
                <Label htmlFor="access_log" className="text-right col-span-2">
                  {t('new_password')}
                </Label>
                <Input
                  id="new_password"
                  name="new_password"
                  className="col-span-3"
                />
              </div>

              {/* Site ID */}
              <div className="grid grid-cols-5 items-center gap-4">
                <Label className="text-right col-span-2">
                  {t('confirm_password')}
                </Label>
                <Input
                  id="confirm_password"
                  name="confirm_password"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-end  gap-4">
                <Button
                  variant="secondary"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  {btn('back')}
                </Button>
                <Button onClick={handleUpdate}>{btn('update')}</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog open={isEditedDialogOpen} onOpenChange={setIsEditedDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('password_changed_success')}</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setIsEditedDialogOpen(false)}>
                {btn('back')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

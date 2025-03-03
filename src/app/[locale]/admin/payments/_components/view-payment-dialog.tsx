'use client';

import type { Channels } from '@/db/schema';
import type { Row } from '@tanstack/react-table';
import { Loader, Trash } from 'lucide-react';
import * as React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';

import { deleteTasks } from '../_lib/actions';
import { useTranslations } from 'next-intl';

interface ViewPaymentChannelDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  tasks: Row<Channels>['original'][];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function ViewPaymentChannelDialog({
  tasks,
  showTrigger = true,
  onSuccess,
  ...props
}: ViewPaymentChannelDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');

  function onDelete() {
    startDeleteTransition(async () => {
      const { error } = await deleteTasks({
        ids: tasks.map((task) => task.id),
      });

      if (error) {
        toast.error(error);
        return;
      }

      props.onOpenChange?.(false);
      toast.success('Tasks deleted');
      onSuccess?.();
    });
  }

  const t = useTranslations('Payment');
  const btn = useTranslations('Button');
  const br = useTranslations('Breadcrumb');
  const col = useTranslations('Column');

  function handleCancel() {
    showTrigger = false;
  }

  function handleDelete() {
    showTrigger = false;
  }

  if (isDesktop) {
    return (
      <Dialog {...props}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{br('detail_sites')}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-rows-none grid-cols-1 border-y divide-y">
            <div className="flex py-6">
              <div className="w-40">{t('payment_id')}</div>
              <div>payment_id</div>
            </div>
            <div className="flex py-6">
              <div className="w-40">{t('api_key')}</div>
              <div>api_key</div>
            </div>
            <div className="flex py-6">
              <div className="w-40">{col('status')}</div>
              <div>status</div>
            </div>
            <div className="flex py-6">
              <div className="w-40">{col('created_at')}</div>
              <div>created_at</div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">{btn('back')}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer {...props}>
      {showTrigger ? (
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <Trash className="mr-2 size-4" aria-hidden="true" />
            Delete ({tasks.length})
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your{' '}
            <span className="font-medium">{tasks.length}</span>
            {tasks.length === 1 ? ' task' : ' tasks'} from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">{btn('back')}</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

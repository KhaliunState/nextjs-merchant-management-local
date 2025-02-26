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

interface DeleteChannelDialogProps
  extends React.ComponentPropsWithoutRef<typeof Dialog> {
  channels: Row<Channels>['original'][];
  showTrigger?: boolean;
  onSuccess?: () => void;
}

export function DeleteChannelDialog({
  channels: channels,
  showTrigger = true,
  onSuccess,
  ...props
}: DeleteChannelDialogProps) {
  const [isDeletePending, startDeleteTransition] = React.useTransition();
  const isDesktop = useMediaQuery('(min-width: 640px)');

  function onDelete() {
    startDeleteTransition(async () => {
      const { error } = await deleteTasks({
        ids: channels.map((task) => task.id),
      });

      if (error) {
        toast.error(error);
        return;
      }

      props.onOpenChange?.(false);
      toast.success('Site deleted');
      onSuccess?.();
    });
  }

  const t = useTranslations('Site');
  const btn = useTranslations('Button');

  function handleCancel() {
    showTrigger = false;
  }

  function handleDelete() {
    showTrigger = false;
  }

  if (isDesktop) {
    return (
      <Dialog {...props}>
        {showTrigger ? (
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Trash className="mr-2 size-4" aria-hidden="true" />
              Delete ({channels.length})
            </Button>
          </DialogTrigger>
        ) : null}
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('confirm_delete_site')}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-rows-none grid-cols-1 border-y divide-y">
            <div className="flex py-6">
              <div className="w-40">{t('site_name')}</div>
              <div>site_name</div>
            </div>
            <div className="flex py-6">
              <div className="w-40">{t('url')}</div>
              <div>url</div>
            </div>
            <div className="flex py-6">
              <div className="w-40">{t('client_id')}</div>
              <div>client_id</div>
            </div>
            <div className="flex py-6">
              <div className="w-40">{t('created_at')}</div>
              <div>created_at</div>
            </div>
            <div className="flex py-6">
              <div className="w-40">{t('status')}</div>
              <div>status</div>
            </div>
          </div>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">{btn('cancel')}</Button>
            </DialogClose>
            <Button
              aria-label="Delete selected rows"
              variant="destructive"
              onClick={onDelete}
              disabled={isDeletePending}
            >
              {isDeletePending && (
                <Loader
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              {btn('delete')}
            </Button>
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
            Delete ({channels.length})
          </Button>
        </DrawerTrigger>
      ) : null}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>
            This action cannot be undone. This will permanently delete your{' '}
            <span className="font-medium">{channels.length}</span>
            {channels.length === 1 ? ' task' : ' tasks'} from our servers.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="gap-2 sm:space-x-0">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
          <Button
            aria-label="Delete selected rows"
            variant="destructive"
            onClick={onDelete}
            disabled={isDeletePending}
          >
            {isDeletePending && (
              <Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
            )}
            Delete
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

'use client';

import { type Channels, statusValues } from '@/db/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';

import { updateTask } from '../_lib/actions';
import { type UpdatePspSchema, updatePspSchema } from '../_lib/validations';
import { useTranslations } from 'use-intl';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface UpdateSiteSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  payment: Channels | null;
}

export function UpdateSiteSheet({
  payment: payment,
  ...props
}: UpdateSiteSheetProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();

  const form = useForm<UpdatePspSchema>({
    resolver: zodResolver(updatePspSchema),
    defaultValues: {
      payment_id: payment?.id ?? '',
      api_key: payment?.api_key ?? '',
      status: payment?.status ?? '',
    },
  });

  const fields = [
    // { name: 'id', label: 'ID', placeholder: 'Enter ID' },
    // { name: 'code', label: 'Code', placeholder: 'Enter Code' },
    { name: 'site_name', label: 'Site Name', placeholder: 'Enter Site Name' },
    { name: 'url', label: 'URL', placeholder: 'Enter URL' },
    { name: 'client_id', label: 'Client ID', placeholder: 'Enter Client ID' },
    { name: 'status', label: 'Status', placeholder: 'Enter Status' },
  ];

  function onSubmit(input: UpdatePspSchema) {
    startUpdateTransition(async () => {
      if (!payment) return;

      const { error } = await updateTask({
        id: payment.id,
        ...input,
      });

      if (error) {
        toast.success('Error');
        return;
      }

      form.reset();
      props.onOpenChange?.(false);
      toast.success('Your changes have been saved.');
    });
  }

  const t = useTranslations('Site');
  const btn = useTranslations('Button');
  const br = useTranslations('Breadcrumb');

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{br('edit_sites')}</SheetTitle>
          <SheetDescription>
            Update the task details and save the changes
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {fields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name as 'payment_id' | 'api_key' | 'status'}
                render={({ field: inputField }) => (
                  <FormItem>
                    <FormLabel>{t(field.name)}</FormLabel>
                    <FormControl>
                      <Input placeholder={field.placeholder} {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  {btn('cancel')}
                </Button>
              </SheetClose>
              <Button disabled={isUpdatePending}>
                {isUpdatePending && (
                  <Loader
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                {btn('save')}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}

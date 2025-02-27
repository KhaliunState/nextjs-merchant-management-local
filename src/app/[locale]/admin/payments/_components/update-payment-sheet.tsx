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

interface UpdatePaymentChannelSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  payment: Channels | null;
}

export function UpdatePaymentChannelSheet({
  payment: payment,
  ...props
}: UpdatePaymentChannelSheetProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();

  const form = useForm<UpdatePspSchema>({
    resolver: zodResolver(updatePspSchema),
    defaultValues: {
      payment_id: payment?.payment_id ?? '',
      api_key: payment?.api_key ?? '',
      password: payment?.password ?? '',
      status: payment?.status ?? '',
    },
  });

  const fields = [
    {
      name: 'payment_id',
      label: 'payment_id',
      placeholder: 'Enter Payment ID',
    },
    { name: 'api_key', label: 'api_key', placeholder: 'Enter api_key' },
    { name: 'password', label: 'password', placeholder: 'Enter password' },
    { name: 'status', label: 'status', placeholder: 'Enter Status' },
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

  const t = useTranslations('Payment');
  const btn = useTranslations('Button');
  const br = useTranslations('Breadcrumb');

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{t('p_channel_detail')}</SheetTitle>
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
                name={
                  field.name as 'payment_id' | 'api_key' | 'password' | 'status'
                }
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

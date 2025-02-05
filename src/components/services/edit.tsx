'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/routing';

export function EditService() {
  const t = useTranslations('Service');
  const s = useTranslations('Status');
  const valMsg = useTranslations('Validations');
  const btn = useTranslations('Buttons');

  const formSchema = z.object({
    service_id: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    service_name: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    service_type: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    failure_fee: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    status: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service_id: '',
      service_name: '',
      service_type: '',
      failure_fee: '',
      status: '',
    },
  });

  const [isUpdateDialogOpen, setIsUpdatedDialogOpen] = React.useState(false);

  const router = useRouter();
  function handleBack(event: React.FormEvent) {
    router.push('/admin/services');
  }

  const form2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsUpdatedDialogOpen(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5 mt-5">
        <h1 className="text-2xl">{t('edit_service')}</h1>
        <div className="grid grid-rows-none grid-cols-2 gap-4 mt-10">
          <div>
            <FormField
              control={form.control}
              name="service_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('service_id')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('service_id')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="service_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('service_name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('service_name')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="service_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('service_type')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('service_type')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="failure_fee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('failure_fee')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('failure_fee')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('status')}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={s('select_status')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">{s('active')}</SelectItem>
                        <SelectItem value="inactive">
                          {s('inactive')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="mt-10 flex justify-end gap-4">
          <Button onClick={handleBack} className="w-20" variant="secondary">
            {btn('back')}
          </Button>
          <Button type="submit" className="w-20">
            {btn('update')}
          </Button>
        </div>
        <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdatedDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('service_updated_success')}</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleBack}>{btn('back')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}

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

import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/routing';

export function EnterSiteInfo({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const t = useTranslations('Site');
  const valMsg = useTranslations('Validations');
  const btn = useTranslations('Button');

  const formSchema = z.object({
    site_id: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    sitename: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    url: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
    status: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
    notes: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      site_id: '',
      sitename: '',
      url: '',
      status: '',
      notes: '',
    },
  });

  const router = useRouter();
  function handleBack(event: React.FormEvent) {
    router.push('/admin/sites');
  }

  const form2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(event: React.FormEvent) {
    setActiveStep(1);
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-4/5 mt-5">
        <div className="grid grid-rows-none grid-cols-2 gap-4 mt-10">
          <div>
            <FormField
              control={form.control}
              name="site_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('site_id')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('site_id')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="sitename"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('site_name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('site_name')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('url')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('url')} {...field} />
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
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t('select_status')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">{t('active')}</SelectItem>
                        <SelectItem value="inactive">
                          {t('inactive')}
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
        <div className="grid grid-flow-col gap-4">
          <div>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('notes')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('type_your_notes')} id="notes" />
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
            {btn('next')}
          </Button>
        </div>
      </form>
    </Form>
  );
}

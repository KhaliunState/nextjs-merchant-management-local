'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button } from '@/components/ui/button';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SiteConfirmation } from '@/components/site/create/site-confirmation';

import {
  Form,
  FormControl,
  FormDescription,
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
import { toast } from '@/hooks/use-toast';

export function EnterGMOInfo({
  setActiveStep,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const t = useTranslations('Site');
  const valMsg = useTranslations('Validations');
  const btn = useTranslations('Button');

  const steps = [
    t('enter_site_info'),
    t('select_payment_service'),
    t('register_psp'),
    t('confirmation'),
  ];

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
    type: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
    psp_id: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
    key: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
    shared_secret: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
    connector_label: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
    acquirer_bin: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
    acquirer_merchant_id: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
    acquirer_country_code: z.string().min(2, {
      message: valMsg('msg_pls_fill'),
    }),
    source_verification_code: z.string().min(2, {
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
      type: '',
      psp_id: '',
      key: '',
      shared_secret: '',
      connector_label: '',
      acquirer_bin: '',
      acquirer_merchant_id: '',
      acquirer_country_code: '',
      source_verification_code: '',
    },
  });

  function handleSubmit(event: React.FormEvent) {
    setActiveStep(3);
  }

  function handleBack(event: React.FormEvent) {
    setActiveStep(1);
  }

  const form2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="w-10/12 mt-5">
        <div className="grid grid-rows-none grid-cols-2 gap-4 mt-10">
          <div>
            <FormField
              control={form.control}
              name="psp_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('psp_id')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('psp_id')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="key"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('key')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('key')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="shared_secret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('shared_secret')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('shared_secret')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="connector_label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('connector_label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('connector_label')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="acquirer_bin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('acquirer_bin')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('acquirer_bin')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="acquirer_merchant_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('acquirer_merchant_id')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('acquirer_merchant_id')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="acquirer_country_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('acquirer_country_code')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('acquirer_country_code')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="source_verification_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('source_verification_code')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('source_verification_code')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="source_verification_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('source_verification_code')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('source_verification_code')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="source_verification_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('source_verification_code')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('source_verification_code')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="source_verification_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('source_verification_code')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('source_verification_code')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="source_verification_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('source_verification_code')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('source_verification_code')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="source_verification_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('source_verification_code')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('source_verification_code')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="source_verification_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('source_verification_code')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('source_verification_code')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="mt-10 flex justify-end  gap-4">
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

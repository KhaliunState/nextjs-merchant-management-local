'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/routing';

export function EditClient() {
  const t = useTranslations('Client');
  const valMsg = useTranslations('Validations');
  const btn = useTranslations('Button');
  const [isUpdatedDialogOpen, setIsUpdatedDialogOpen] = React.useState(false);

  const formSchema = z.object({
    business_type: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    corporate_number: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    company_name: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    company_name_kana: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    home_page_url: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    post_code: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    address_line1: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    address_line2: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    phone_number: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    email: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    establishment_date: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    total_employees: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    annual_sales: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    business_description: z
      .string()
      .min(2, { message: valMsg('msg_pls_fill') }),
    industr: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    representative_name: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    representative_name_kana: z
      .string()
      .min(2, { message: valMsg('msg_pls_fill') }),
    representative_birth_date: z
      .string()
      .min(2, { message: valMsg('msg_pls_fill') }),
    representative_post_code: z
      .string()
      .min(2, { message: valMsg('msg_pls_fill') }),
    representative_line_address1: z
      .string()
      .min(2, { message: valMsg('msg_pls_fill') }),
    representative_line_address2: z
      .string()
      .min(2, { message: valMsg('msg_pls_fill') }),
    created_at: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    updated_at: z.string().min(2, { message: valMsg('msg_pls_fill') }),
    notes: z.string().min(2, { message: valMsg('msg_pls_fill') }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_type: '',
      corporate_number: '',
      company_name: '',
      company_name_kana: '',
      home_page_url: '',
      post_code: '',
      address_line1: '',
      address_line2: '',
      phone_number: '',
      email: '',
      establishment_date: '',
      total_employees: '',
      annual_sales: '',
      business_description: '',
      industr: '',
      representative_name: '',
      representative_name_kana: '',
      representative_birth_date: '',
      representative_post_code: '',
      representative_line_address1: '',
      representative_line_address2: '',
      created_at: '',
      updated_at: '',
      notes: '',
    },
  });

  const router = useRouter();
  function handleBack(event: React.FormEvent) {
    router.push('/admin');
  }

  function handleOK(event: React.FormEvent) {
    router.push('/admin/client');
  }

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsUpdatedDialogOpen(true);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-4/5">
          <h1 className="text-2xl">{t('edit_client')}</h1>
          <div className="grid grid-rows-none grid-cols-2 gap-4 mt-10">
            <div>
              <FormField
                control={form.control}
                name="business_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('business_type')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('business_type')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="corporate_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('corporate_number')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('corporate_number')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="home_page_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('home_page_url')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('home_page_url')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="post_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('post_code')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('post_code')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="address_line1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('address_line1')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('address_line1')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="address_line2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('address_line2')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('address_line2')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('phone_number')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('phone_number')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('email')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('email')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="establishment_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('establishment_date')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('establishment_date')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="total_employees"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('total_employees')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('total_employees')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="annual_sales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('annual_sales')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('annual_sales')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="business_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('business_description')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('business_description')}
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
                name="industr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('industr')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('industr')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="representative_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('representative_name')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('representative_name')}
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
                name="representative_name_kana"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('representative_name_kana')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('representative_name_kana')}
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
                name="representative_birth_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('representative_birth_date')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('representative_birth_date')}
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
                name="representative_post_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('representative_post_code')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('representative_post_code')}
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
                name="representative_line_address1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('representative_line_address1')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('representative_line_address1')}
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
                name="representative_line_address2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('representative_line_address2')}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t('representative_line_address2')}
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
                name="created_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('created_at')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('created_at')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('notes')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('type_your_notes')}
                        id="notes"
                        {...field}
                      />
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
              {btn('edit')}
            </Button>
          </div>
        </form>
      </Form>
      <Dialog open={isUpdatedDialogOpen} onOpenChange={setIsUpdatedDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('client_updated_success')}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleOK}>{btn('ok')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

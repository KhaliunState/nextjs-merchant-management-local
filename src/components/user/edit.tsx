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

export function EditUser() {
  const t = useTranslations('User');
  const s = useTranslations('Status');
  const valMsg = useTranslations('Validations');
  const btn = useTranslations('Buttons');

  const formSchema = z.object({
    user_id: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    username: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    client_id: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    email: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    password: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    role: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    cognito_id: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
    status: z.string().min(2, {
      message: valMsg('msg_site_name'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: '',
      username: '',
      client_id: '',
      email: '',
      password: '',
      role: '',
      cognito_id: '',
      status: '',
    },
  });

  const [isUpdateDialogOpen, setIsUpdatedDialogOpen] = React.useState(false);

  const router = useRouter();
  function handleBack(event: React.FormEvent) {
    router.push('/admin/users');
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
        <h1 className="text-2xl">{t('edit_user')}</h1>
        <div className="grid grid-rows-none grid-cols-2 gap-4 mt-10">
          <div>
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('user_id')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('user_id')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('username')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('username')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="client_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('client_id')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('client_id')} {...field} />
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('password')}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t('password')}
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('role')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('role')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="cognito_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('cognito_id')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('cognito_id')} {...field} />
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
              <DialogTitle>{t('user_updated_success')}</DialogTitle>
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

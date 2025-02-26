'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export function SelectPSP({
  setActiveStep,
  setIsContracted,
}: {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setIsContracted: React.Dispatch<React.SetStateAction<boolean>>;
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
  function handleNoContracted() {
    setActiveStep(2);
    setIsContracted(false);
  }
  function handleYesContracted() {
    setIsContracted(true);
    setActiveStep(2);
  }

  const form2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsDialogOpen(true);
  }

  function handleBack(event: React.FormEvent) {
    setActiveStep(0);
  }

  const [selected, setSelected] = React.useState('all');

  return (
    <Form {...form2}>
      <form className="w-4/5 space-y-6 mt-10">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  onValueChange={setSelected}
                  value={selected}
                  className="flex flex-col space-y-1"
                >
                  <FormItem
                    className={
                      'flex items-baseline p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' +
                      (selected === 'all'
                        ? 'transition-height duration-500 ease-in-out h-fit'
                        : 'transition-height duration-500 ease-out-in h-14')
                    }
                  >
                    <div className="grid-rows-2 gap-4 w-full">
                      <div>
                        <FormLabel className="h-full w-full inline-block">
                          <FormControl className=" mr-3">
                            <RadioGroupItem value="all" />
                          </FormControl>
                          クレジットカード
                        </FormLabel>
                      </div>

                      <div
                        className={selected === 'all' ? 'visible' : 'invisible'}
                      >
                        <div className="pt-4 columns-4">
                          <div className="w-full">
                            <div
                              className={
                                'p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-25' +
                                (selected === 'all'
                                  ? 'transition-opacity duration-1000 opacity-1'
                                  : '')
                              }
                            >
                              <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  Cybersource
                                </h5>
                              </a>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                詐欺管理ツール、安全な支払い処理、さまざまな支払い方法を提供する信頼性の高いプロセッサ...
                              </p>
                              <Button onClick={handleSubmit} className="w-full">
                                +選択
                              </Button>
                            </div>
                          </div>
                          <div className="w-full">
                            <div
                              className={
                                'p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-25' +
                                (selected === 'all'
                                  ? 'transition-opacity duration-1000 opacity-1'
                                  : '')
                              }
                            >
                              <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  Cybersource
                                </h5>
                              </a>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                詐欺管理ツール、安全な支払い処理、さまざまな支払い方法を提供する信頼性の高いプロセッサ...
                              </p>
                              <Button onClick={handleSubmit} className="w-full">
                                +選択
                              </Button>
                            </div>
                          </div>
                          <div className="w-full">
                            <div
                              className={
                                'p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-25' +
                                (selected === 'all'
                                  ? 'transition-opacity duration-1000 opacity-1'
                                  : '')
                              }
                            >
                              <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  Cybersource
                                </h5>
                              </a>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                詐欺管理ツール、安全な支払い処理、さまざまな支払い方法を提供する信頼性の高いプロセッサ...
                              </p>
                              <Button onClick={handleSubmit} className="w-full">
                                +選択
                              </Button>
                            </div>
                          </div>
                          <div className="w-full">
                            <div
                              className={
                                'p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-25' +
                                (selected === 'all'
                                  ? 'transition-opacity duration-1000 opacity-1'
                                  : '')
                              }
                            >
                              <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  Cybersource
                                </h5>
                              </a>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                詐欺管理ツール、安全な支払い処理、さまざまな支払い方法を提供する信頼性の高いプロセッサ...
                              </p>
                              <Button onClick={handleSubmit} className="w-full">
                                +選択
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                  <FormItem
                    className={
                      'flex items-baseline p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700' +
                      (selected === 'conbini'
                        ? 'transition-height duration-500 ease-in-out h-fit'
                        : 'transition-height duration-500 ease-out-in h-14')
                    }
                  >
                    <div className="grid-rows-2 gap-4 w-full">
                      <div>
                        <FormLabel className="h-full w-full inline-block">
                          <FormControl className=" mr-3">
                            <RadioGroupItem value="conbini" />
                          </FormControl>
                          コンビニ
                        </FormLabel>
                      </div>
                      <div
                        className={
                          selected === 'conbini' ? 'visible' : 'invisible'
                        }
                      >
                        <div className="pt-4 columns-4">
                          <div className="w-full">
                            <div
                              className={
                                'p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-25' +
                                (selected === 'conbini'
                                  ? 'transition-opacity duration-1000 opacity-1'
                                  : '')
                              }
                            >
                              <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  Cybersource
                                </h5>
                              </a>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                詐欺管理ツール、安全な支払い処理、さまざまな支払い方法を提供する信頼性の高いプロセッサ...
                              </p>
                              <Button onClick={handleSubmit} className="w-full">
                                +選択
                              </Button>
                            </div>
                          </div>
                          <div className="w-full">
                            <div
                              className={
                                'p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-25' +
                                (selected === 'conbini'
                                  ? 'transition-opacity duration-1000 opacity-1'
                                  : '')
                              }
                            >
                              <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  Cybersource
                                </h5>
                              </a>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                詐欺管理ツール、安全な支払い処理、さまざまな支払い方法を提供する信頼性の高いプロセッサ...
                              </p>
                              <Button onClick={handleSubmit} className="w-full">
                                +選択
                              </Button>
                            </div>
                          </div>
                          <div className="w-full">
                            <div
                              className={
                                'p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-25' +
                                (selected === 'conbini'
                                  ? 'transition-opacity duration-1000 opacity-1'
                                  : '')
                              }
                            >
                              <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  Cybersource
                                </h5>
                              </a>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                詐欺管理ツール、安全な支払い処理、さまざまな支払い方法を提供する信頼性の高いプロセッサ...
                              </p>
                              <Button onClick={handleSubmit} className="w-full">
                                +選択
                              </Button>
                            </div>
                          </div>
                          <div className="w-full">
                            <div
                              className={
                                'p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 opacity-25' +
                                (selected === 'conbini'
                                  ? 'transition-opacity duration-1000 opacity-1'
                                  : '')
                              }
                            >
                              <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                  Cybersource
                                </h5>
                              </a>
                              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                詐欺管理ツール、安全な支払い処理、さまざまな支払い方法を提供する信頼性の高いプロセッサ...
                              </p>
                              <Button onClick={handleSubmit} className="w-full">
                                +選択
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('gmo_contracted')}</DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleYesContracted}>{t('yes')}</Button>
              <Button onClick={handleNoContracted}>{t('no')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
      <div className="mt-10 w-4/5 flex justify-end">
        <Button onClick={handleBack} className="w-20" variant="secondary">
          {btn('back')}
        </Button>
      </div>
    </Form>
  );
}

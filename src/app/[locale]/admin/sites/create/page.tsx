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
import { EnterSiteInfo } from '@/components/site/create/enter-site-info';
import { SelectPSP } from '@/components/site/create/select-psp';
import { EnterPSPInfo } from '@/components/site/create/enter-psp-info';
import { useRouter } from '@/i18n/routing';
import { EnterGMOInfo } from '@/components/site/create/enter-gmo-info';

export default function CreateSite() {
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
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const [isContracted, setIsContracted] = React.useState(false);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

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

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  const form2 = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();
  function handleOK(event: React.FormEvent) {
    router.push('/admin/sites');
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} className="w-4/5">
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{t('site_reg_completed')}</DialogTitle>
              {isContracted === true ? (
                <DialogDescription>
                  {t('pls_wait_review_2weeks')}
                </DialogDescription>
              ) : (
                <DialogDescription>{t('currently_checking')}</DialogDescription>
              )}
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleOK}>{btn('ok')}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }} className="mt-20 text-2xl">
            {steps[activeStep]}
          </Typography>
          {activeStep === 0 ? (
            <EnterSiteInfo setActiveStep={setActiveStep} />
          ) : activeStep === 1 ? (
            <SelectPSP
              setActiveStep={setActiveStep}
              setIsContracted={setIsContracted}
            />
          ) : activeStep === 2 ? (
            isContracted === true ? (
              <EnterPSPInfo setActiveStep={setActiveStep} />
            ) : (
              <EnterGMOInfo setActiveStep={setActiveStep} />
            )
          ) : activeStep === 3 ? (
            <SiteConfirmation
              setActiveStep={setActiveStep}
              setIsDialogOpen={setIsDialogOpen}
            />
          ) : null}
        </React.Fragment>
      )}
    </Box>
  );
}

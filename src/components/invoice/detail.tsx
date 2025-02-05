import { useTranslations } from 'next-intl';
import { Button } from '../ui/button';
import React from 'react';
import jsPDF from 'jspdf';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from '@/i18n/routing';
import { DownloadIcon } from 'lucide-react';
import DownloadInvoice from './download';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '../ui/separator';

const data: Data = {
  invoice: {
    invoice_id: '1004',
    access_log: 'Sample log for invoice 1004',
    site_id: '0004',
    tax: '1200',
    storage_fee: '150',
    total: '1350',
    created_at: '2025/01/17',
    updated_at: '2025/01/19',
    status: 'failed',
  },
};

// Example data following the structure of Data type
type Data = {
  invoice: {
    invoice_id: string;
    access_log: string;
    site_id: string;
    tax: string;
    storage_fee: string;
    total: string;
    created_at: string;
    updated_at: string;
    status: 'pending' | 'processing' | 'success' | 'failed';
  };
};

export function InvoiceDetail() {
  const i = useTranslations('Invoice');
  const c = useTranslations('Client');
  const btn = useTranslations('Buttons');
  const tb = useTranslations('Table');
  const router = useRouter();

  function handleUpdate(event: React.FormEvent) {
    router.push('/admin/client/edit');
  }

  function handleBack(event: React.FormEvent) {
    router.push('/admin/invoices');
  }
  function handleClose(event: React.FormEvent) {
    setIsDownloadedDialogOpen(false);
  }
  const [isDownloadDialogOpen, setIsDownloadedDialogOpen] =
    React.useState(false);

  return (
    <div className="w-4/5">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;700&display=swap');
      `}
      </style>
      <h1 className="text-2xl">{i('invoice_detail')}</h1>
      <div className="grid grid-cols-1 mt-4">
        <DownloadInvoice
          isButton={true}
          setIsDownloadedDialogOpen={setIsDownloadedDialogOpen}
        ></DownloadInvoice>
      </div>
      <Card
        className="mt-10"
        style={{
          fontFamily: "'Noto Sans', sans-serif",
          padding: '16px',
          color: '#333',
        }}
      >
        <CardContent className="mt-6">
          <div>
            <div className="grid grid-rows-none grid-cols-1 gap-3">
              <p className='text-3xl'>{i('invoice')}</p>
              <p>{c('client_id')}: 0004</p>
              <p>{c('client_name')}: Tanaka</p>
              <p>{c('address')}: Tokyo, Shinjuku</p>
              <p>{c('email')}: customer@example.com</p>

              <p className='text-xl mt-6'>{i('invoice_info')}</p>
              <p>{i('invoice_id')}: 1004</p>
              <p>{i('invoice_date')}: 2025/01/17</p>
              <p>{i('due_date')}: 2025/01/19</p>
              <p>{i('status')}: failed</p>
              <Separator className="my-4" />

              <p className='text-xl'>{i('itemized_charges')}</p>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {i('description')}
                  </p>
                </div>
                <div>
                  <p>{i('amount')}</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">
                    {i('storage_fee')}
                  </p>
                </div>
                <div>
                  <p>¥150</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{i('tax')}</p>
                </div>
                <div>
                  <p>¥1200</p>
                </div>
              </div>
              <div className="flex">
                <div className="w-80">
                  <p className="text-gray-600 font-medium">{i('total')}</p>
                </div>
                <div>
                  <p>¥1350</p>
                </div>
              </div>
              <Separator className="my-4" />
              <p className='text-xl'>{i('total_amount_due')}</p>
              <p>{i('total')}: ¥1350</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end mt-5 gap-4">
        <Button variant="outline" className="w-20" onClick={handleBack}>
          {btn('back')}
        </Button>
      </div>
      <Dialog
        open={isDownloadDialogOpen}
        onOpenChange={setIsDownloadedDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{i('invoice_downloaded_success')}</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleClose}>{btn('back')}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
